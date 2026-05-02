import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ user }) {
  const { logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-[#0f172a]/80 border-b border-cyan-500/20 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Quantum Phishing Shield
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-cyan-100/70 text-sm hidden md:block">
              Welcome, <strong className="text-cyan-400">{user.name || user.email}</strong>
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all font-medium text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all font-medium text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
