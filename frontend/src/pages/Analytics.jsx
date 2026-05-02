import React from 'react';

export default function Analytics() {
  return (
    <div className="flex-1 w-full bg-[#0f172a]/80 backdrop-blur-md rounded-2xl border border-cyan-500/20 p-8 shadow-xl shadow-cyan-900/10">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
        System Analytics
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#030712]/50 border border-cyan-500/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full" />
          <h3 className="text-cyan-100/70 text-sm font-medium mb-2 uppercase tracking-wider">Total Scans</h3>
          <p className="text-4xl font-bold text-cyan-400 font-display">12,458</p>
        </div>
        <div className="bg-[#030712]/50 border border-red-500/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-bl-full" />
          <h3 className="text-cyan-100/70 text-sm font-medium mb-2 uppercase tracking-wider">Threats Detected</h3>
          <p className="text-4xl font-bold text-red-400 font-display">3,291</p>
        </div>
        <div className="bg-[#030712]/50 border border-green-500/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full" />
          <h3 className="text-cyan-100/70 text-sm font-medium mb-2 uppercase tracking-wider">System Health</h3>
          <p className="text-4xl font-bold text-green-400 font-display">100%</p>
        </div>
      </div>

      <div className="h-64 bg-[#030712]/50 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-100/30 font-mono text-sm border-dashed">
        [ Chart Visualization Output Here ]
      </div>
    </div>
  );
}
