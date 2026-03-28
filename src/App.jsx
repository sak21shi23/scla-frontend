import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, X, Layers3 } from 'lucide-react';
import axios from 'axios';

// --- CONFIGURATION ---
const API_URL = "https://scla-backend-sakshi.onrender.com";

// --- SIGN IN MODAL ---
const SignInModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/login`, { email, password });
      alert("Success! Welcome to SCLA.");
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Login fail ho gaya.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="bg-[#0f172a] border border-white/10 p-8 rounded-3xl w-full max-w-md relative z-10 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X size={24} />
        </button>

        <h2 className="text-3xl font-black text-white mb-6 italic uppercase tracking-tighter text-center">
          Sign <span className="text-cyan-400">In</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-cyan-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 py-4 rounded-xl font-bold uppercase text-white shadow-lg shadow-cyan-500/20"
          >
            {loading ? "Verifying..." : "Login to Academy"}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- HOME PAGE ---
const Home = () => (
  <header className="relative h-[700px] flex items-center overflow-hidden">
    <div className="absolute inset-0 bg-[#0f172a]">
      <img src="/hero.png" alt="Hero" className="w-full h-full object-cover opacity-60" />
    </div>

    <div className="relative z-10 px-12 md:px-24 max-w-4xl">
      <h2 className="text-cyan-400 text-sm font-bold tracking-[4px] uppercase mb-4 flex items-center gap-2">
        <Layers3 size={18} /> Premium Leadership Training
      </h2>

      <h1 className="text-6xl md:text-8xl font-black mb-8 italic uppercase text-white">
        Unlock Your <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          Future.
        </span>
      </h1>

      <Link
        to="/courses"
        className="bg-cyan-500 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition inline-flex items-center gap-2 shadow-xl shadow-cyan-500/30"
      >
        Browse All Courses <ArrowRight size={18} />
      </Link>
    </div>
  </header>
);

// --- COURSES PAGE ---
const Courses = () => (
  <div className="pt-32 px-12 pb-20 max-w-7xl mx-auto text-white">
    <h2 className="text-4xl font-black mb-10 italic uppercase border-l-4 border-cyan-500 pl-6 tracking-tighter">
      Our Leadership Modules
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-cyan-500/50 transition cursor-pointer group shadow-xl"
        >
          <h3 className="text-xl font-bold mb-2 tracking-tight">SCLA Module {item}</h3>
          <p className="text-slate-400 text-sm mb-4">
            Master professional leadership and ethics.
          </p>
          <button className="text-cyan-400 font-bold text-xs uppercase tracking-widest group-hover:text-white transition">
            Enroll Now +
          </button>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [isSignInOpen, setSignInOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] font-sans">
        
        {/* Sign In Modal */}
        <SignInModal
          isOpen={isSignInOpen}
          onClose={() => setSignInOpen(false)}
        />

        {/* Navbar */}
        <nav className="fixed w-full top-0 z-50 bg-[#0f172a]/90 backdrop-blur-lg border-b border-white/5 px-8 py-5">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center font-black text-white shadow-lg shadow-cyan-500/20">
                S
              </div>
              <span className="font-black text-white text-xl uppercase tracking-tighter">
                SCLA
              </span>
            </Link>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setSignInOpen(true)}
                className="text-[11px] font-bold uppercase tracking-[2px] text-slate-300 hover:text-white transition"
              >
                Sign In
              </button>

              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center gap-3">
                <ShoppingBag size={18} className="text-slate-400" />
                <span className="text-white font-bold text-sm">0</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </div>
    </Router>
  );
}