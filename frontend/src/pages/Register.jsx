import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const API = import.meta.env.VITE_API_URL || '';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/auth/register`, { name, email, password });
      login(res.data, res.data.token);
      addToast('Registration successful', 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast(err.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center relative z-10 w-full min-h-[80vh]">
      <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-xl border border-cyan-500/30 p-8 rounded-2xl shadow-xl shadow-cyan-900/20">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 text-center">
          Request Clearance
        </h2>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div>
            <label className="text-cyan-100/70 text-sm mb-1 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#030712]/50 border border-cyan-500/20 rounded-lg px-4 py-3 text-cyan-100 focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="text-cyan-100/70 text-sm mb-1 block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#030712]/50 border border-cyan-500/20 rounded-lg px-4 py-3 text-cyan-100 focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="operator@quantum.shield"
            />
          </div>
          <div>
            <label className="text-cyan-100/70 text-sm mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#030712]/50 border border-cyan-500/20 rounded-lg px-4 py-3 text-cyan-100 focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 rounded-lg transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)] disabled:opacity-50 mt-2"
          >
            {loading ? 'Processing...' : 'Register Agent'}
          </button>
        </form>

        <p className="mt-6 text-center text-cyan-100/60 text-sm">
          Already have clearance?{' '}
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
            Authenticate
          </Link>
        </p>
      </div>
    </div>
  );
}
