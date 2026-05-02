import React from 'react';
import { Link } from 'react-router-dom';
import CyberBackground from '../components/CyberBackground';
import QuantumSimulation from '../components/QuantumSimulation';

export default function Landing() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#030712] overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200 text-slate-100 font-sans">
      <CyberBackground variant="grid" />
      
      {/* Decorative Fixed Glows */}
      <div className="fixed top-0 inset-x-0 h-40 bg-gradient-to-b from-[#0891b2]/10 to-transparent pointer-events-none" />

      {/* Header Overlay */}
      <header className="absolute top-0 w-full z-50 border-b border-cyan-500/10 bg-[#0f172a]/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                🛡️
             </div>
             <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">
               Quantum Shield
             </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
             <Link to="/login" className="text-cyan-100/70 hover:text-cyan-300 transition-colors uppercase tracking-wider text-xs">User Portal</Link>
             <Link to="/admin/login" className="text-blue-200/70 hover:text-blue-300 transition-colors uppercase tracking-wider text-xs">Admin Panel</Link>
             <Link to="/register" className="px-6 py-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:-translate-y-0.5 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] uppercase tracking-wider text-xs font-bold">
               Get Started
             </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full z-10 pt-28 flex flex-col items-center">
        
        {/* HERO SECTION */}
        <section className="relative w-full max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
           {/* Animated Background Simulation just for Hero */}
           <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-60">
             <QuantumSimulation fixed={false} />
           </div>

           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium uppercase tracking-widest mb-8 animate-fade-in-up">
             <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
             Core Engine v2.1 Online
           </div>

           <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter animate-fade-in-up" style={{ animationDelay: '100ms' }}>
             <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
               Detect Threats.
             </span>
             <br />
             <span className="text-4xl md:text-6xl lg:text-7xl text-cyan-500/80 uppercase tracking-widest font-display font-light mt-4 block">
               Before they strike.
             </span>
           </h1>
           
           <p className="mt-8 text-lg md:text-2xl text-cyan-100/60 font-light max-w-3xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
             Harness the power of neural heuristics and advanced machine learning to identify 
             sophisticated phishing infrastructure in real-time. Unprecedented accuracy out of the box.
           </p>

           <div className="mt-12 flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Link to="/login" className="group relative px-8 py-4 bg-cyan-500 text-slate-950 font-bold uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2">Initialize Scan <span className="text-xl">→</span></span>
              </Link>
              <Link to="/register" className="px-8 py-4 bg-[#0f172a]/50 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl backdrop-blur-sm">
                Request Access
              </Link>
           </div>
        </section>

        {/* FEATURES GRID */}
        <section className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-cyan-500/10">
           <div className="text-center mb-20 animate-fade-in-up">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built For The Modern Web</h2>
              <p className="text-cyan-100/60 max-w-2xl mx-auto text-lg">Our system evaluates over 60 multi-dimensional security heuristics—from SSL certificate chains to domain registrar entropy instantly.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Neural Heuristics', icon: '🧠', desc: 'Predictive models evaluate URL morphology and lexical features to detect unseen sophisticated threats seamlessly.' },
                { title: 'Zero-Day Shield', icon: '⚡', desc: 'Capable of detecting domains instantiated seconds ago using behavioral intelligence bypassing traditional blocklists.' },
                { title: 'Actionable Intelligence', icon: '📊', desc: 'Enterprise-grade dashboard providing rich visual analytics, historical scan graphs, and immediate mitigation suggestions.' },
              ].map((feature, i) => (
                <div key={i} className="group relative bg-[#0f172a]/40 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 hover:bg-[#0f172a]/80 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full transition-colors group-hover:bg-cyan-500/10" />
                  <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center rounded-2xl text-2xl mb-6 shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-cyan-50 mb-3">{feature.title}</h3>
                  <p className="text-cyan-100/60 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* STATS BANNER */}
        <section className="w-full bg-gradient-to-r from-[#0f172a] via-[#083344] to-[#0f172a] border-y border-cyan-500/20 relative py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Domains Scanned', val: '24M+' },
              { label: 'Zero-Days Blocked', val: '80K+' },
              { label: 'Accuracy Rate', val: '98.9%' },
              { label: 'Response Time', val: '< 50ms' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                  {stat.val}
                </span>
                <span className="mt-2 text-cyan-400/80 font-medium uppercase tracking-widest text-xs">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#030712] border-t border-cyan-500/10 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <span className="text-cyan-500">🛡️</span>
            <span className="font-bold text-cyan-50 tracking-wide uppercase text-sm">Quantum Shield</span>
          </div>
          <div className="text-cyan-100/40 text-xs font-mono text-center md:text-right">
            &copy; {new Date().getFullYear()} Quantum Security Research.<br className="md:hidden" /> All systems normal.
          </div>
        </div>
      </footer>
    </div>
  );
}
