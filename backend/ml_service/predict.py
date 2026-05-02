import os
from pathlib import Path
import joblib
import numpy as np
import time
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from features import extract_url_features
from typing import Any
import warnings
warnings.filterwarnings('ignore')

app = FastAPI(title='Quantum Phishing ML Service')
BASE_DIR = Path(__file__).resolve().parent
CACHE_TTL_SEC = int(os.getenv('PRED_CACHE_TTL', '300'))
_PRED_CACHE: dict[str, tuple[float, dict]] = {}
_CACHE_MAX = int(os.getenv('PRED_CACHE_MAX', '2000'))

def load_or_none(path: Path):
    try:
        if path.exists():
            return joblib.load(path)
    except Exception as e:
        print(f"Error loading {path}: {e}")
    return None

def load_keras_model(path: Path):
    try:
        if not path.exists():
            return None
        from tensorflow.keras.models import load_model
        return load_model(path)
    except BaseException as e:
        print(f"Error loading keras model {path}: {e}")
        return None

# Load Models
print("Loading Ensemble Models...")
SCALER = load_or_none(BASE_DIR / 'scaler.pkl')

RF_MODEL = load_or_none(BASE_DIR / 'random_forest.pkl')
XGB_MODEL = load_or_none(BASE_DIR / 'xgboost.pkl')
DL_MODEL = load_keras_model(BASE_DIR / 'deep_learning.h5')
DOC2VEC = load_or_none(BASE_DIR / 'doc2vec.pkl')
QUANTUM_PROXY = load_or_none(BASE_DIR / 'quantum_proxy.pkl')

class PredictRequest(BaseModel):
    url: str

@app.get('/health')
def health():
    return {'status': 'ok'}

def align_features(X: np.ndarray, expected_dim: int) -> np.ndarray:
    if expected_dim <= 0:
        return X
    current = X.shape[1]
    if current == expected_dim:
        return X
    if current > expected_dim:
        return X[:, :expected_dim]
    pad = np.zeros((X.shape[0], expected_dim - current), dtype=float)
    return np.hstack([X, pad])

def model_expected_dim(model: Any) -> int:
    if model is None:
        return 0
    if hasattr(model, 'n_features_in_'):
        try:
            return int(model.n_features_in_)
        except Exception:
            return 0
    if hasattr(model, 'input_shape') and model.input_shape is not None:
        try:
            shape = model.input_shape
            if isinstance(shape, list): shape = shape[0]
            return int(shape[-1])
        except Exception:
            return 0
    return 0

def get_risk_factors(url: str):
    risk_factors = []
    if '@' in url: risk_factors.append("Contains '@' symbol")
    if url.count('.') > 4: risk_factors.append('Too many subdomains')
    if url.lower().startswith('http://'): risk_factors.append('Not using HTTPS')
    if any(k in url.lower() for k in ['login', 'verify', 'secure', 'account', 'update', 'banking']):
        risk_factors.append('Contains potentially deceptive keywords')
    return risk_factors

@app.post('/predict')
def predict(req: PredictRequest):
    if not req.url or not req.url.strip():
        raise HTTPException(status_code=400, detail='URL is required')

    url = req.url.strip()
    now = time.time()
    cached = _PRED_CACHE.get(url)
    if cached and (now - cached[0]) <= CACHE_TTL_SEC:
        return cached[1]

    risk_factors = get_risk_factors(url)
    
    try:
        # 1. URL string to basic features
        X_url_feat = extract_url_features(url)
        
        # 2. String vectorization via Doc2Vec
        X_d2v = np.zeros((1, 100))
        if DOC2VEC is not None:
            words = url.replace('https://', '').replace('http://', '').replace('/', ' ').replace('.', ' ').split()
            # infer_vector returns a 1D array, convert to 2D
            vec = DOC2VEC.infer_vector(words)
            X_d2v = np.array(vec).reshape(1, -1)
            
        # 3. Combined Base Features
        X_combined = np.hstack([X_url_feat, X_d2v])

        # Sub-routine to get predictions given a model and scaler
        def get_model_proba(model, scaler):
            if model is None: return 0.5
            
            # Use specific scaler if passed
            X_sc = X_combined
            if scaler is not None:
                s_dim = model_expected_dim(scaler)
                X_sc = scaler.transform(align_features(X_combined, s_dim)) if s_dim else scaler.transform(X_combined)

            m_dim = model_expected_dim(model)
            X_in = align_features(X_sc, m_dim) if m_dim else X_sc

            if hasattr(model, 'predict_proba'):
                proba = model.predict_proba(X_in)
                return float(proba[0, 1]) if proba.shape[1] > 1 else float(proba[0, 0])
            elif hasattr(model, 'predict'):
                pred = model.predict(X_in, verbose=0) if "keras" in str(type(model)) else model.predict(X_in)
                pred = np.array(pred)
                if pred.ndim == 2 and pred.shape[1] > 1: return float(pred[0, 1])
                return float(pred.reshape(-1)[0])
            return 0.5

        # 4. Gather Model Predictions
        rf_prob = get_model_proba(RF_MODEL, SCALER)
        xgb_prob = get_model_proba(XGB_MODEL, SCALER)
        dl_prob = get_model_proba(DL_MODEL, SCALER)
        
        doc2vec_prob = 0.5
        if DOC2VEC is not None:
            # We use vector norm or basic heuristics of doc2vec probability, or fallback to heuristics score
             score = 0
             if '@' in url: score += 2
             if url.count('.') > 4: score += 1
             if 'login' in url.lower() or 'verify' in url.lower(): score += 1
             if not url.startswith('http://') and not url.startswith('https://'): score += 3
             doc2vec_prob = min(0.98, 0.5 + 0.1 * score)

        # 5. Quantum Proxy Decision Maker
        # Expects 4 features
        ensemble_features = np.array([[rf_prob, xgb_prob, dl_prob, doc2vec_prob]])
        
        if QUANTUM_PROXY is not None:
            q_dim = model_expected_dim(QUANTUM_PROXY)
            final_in = align_features(ensemble_features, q_dim) if q_dim else ensemble_features
            
            if hasattr(QUANTUM_PROXY, 'predict_proba'):
                q_proba = QUANTUM_PROXY.predict_proba(final_in)[0]
                confidence = float(np.max(q_proba))
                pred_label = QUANTUM_PROXY.predict(final_in)[0]
            else:
                pred_score = QUANTUM_PROXY.predict(final_in)[0]
                confidence = float(pred_score)
                pred_label = 'phishing' if confidence > 0.5 else 'legitimate'
            
            # SAFEGUARD: Trust base models if proxy consistently suppresses detections
            max_base = max(rf_prob, xgb_prob)
            is_clean = len(url) < 55 and not any(sus in url.lower() for sus in ['@', '.ru', '.xyz', '.top', 'login', 'verify', 'free', 'admin', '-'])
            
            if max_base >= 0.55 and confidence < 0.5:
                if not is_clean:
                    pred_label = 'phishing'
                    confidence = max_base
                
        else:
            avg_prob = np.mean([rf_prob, xgb_prob, dl_prob, doc2vec_prob])
            confidence = avg_prob
            pred_label = 'phishing' if confidence > 0.5 else 'legitimate'

        label = 'phishing' if str(pred_label).lower() in ('1', 'phishing', 'true') else 'legitimate'
        payload = {'prediction': label, 'confidence': confidence, 'risk_factors': risk_factors}
        
    except Exception as e:
        print(f"Prediction Pipeline Error: {e}")
        score = 0
        if '@' in url: score += 2
        if url.count('.') > 4: score += 1
        if 'login' in url.lower() or 'verify' in url.lower(): score += 1
        if not url.startswith('http://') and not url.startswith('https://'): score += 3
        
        pred = 'phishing' if score >= 2 else 'legitimate'
        conf = min(0.98, 0.55 + 0.1 * score)
        payload = {'prediction': pred, 'confidence': conf, 'risk_factors': risk_factors}

    if len(_PRED_CACHE) >= _CACHE_MAX:
        _PRED_CACHE.clear()
    _PRED_CACHE[url] = (now, payload)
    
    return payload

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=int(os.getenv('PORT', '8000')))
