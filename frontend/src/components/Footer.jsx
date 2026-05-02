import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto py-6 border-t border-cyan-500/20 bg-[#0f172a]/50 backdrop-blur-md text-center">
      <p className="text-sm text-cyan-400/60 font-mono">
        © {new Date().getFullYear()} Quantum Phishing Shield. All rights reserved.
      </p>
    </footer>
  );
}
