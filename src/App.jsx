import React, { useState } from 'react';
import axios from 'axios'; // 1. Axios import kiya
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag, Zap, ArrowRight, X, User, Lock, Layers3 } from 'lucide-react';

// --- 1. SIGN IN MODAL COMPONENT (Updated with Backend Logic) ---
const SignInModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill all fields");
    
    setLoading(true);
    try {
      // Yahan aapki Render wali link hai
      const res = await axios.post("https://scla-backend-sakshi.onrender.com/api/auth/login", {
        email,
        password
      });
      
      alert("Login Successful! Welcome to SCLA.");
      console.log("User Data:", res.data);
      onClose(); // Modal band ho jayega
    } catch (err) {
      alert("Login Failed: " + (err.response?.data?.message || "Server Error"));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-[#0f172a] border border-white/10 p-8 rounded-3xl w-full max-w-md relative z-10 shadow-2xl shadow-cyan-500/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition">
          <X size={24}/>
        </button>
        
        <h2 className="text-3xl font-black text-white mb-6 italic uppercase tracking-tighter">
          Sign <span className="text-cyan-400">In</span>
        </h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-500" size={18} />
              <input 
                type="email" 
                placeholder="name@email.com" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-cyan-500 outline-none transition"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-cyan-500 outline-none transition"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-xl font-bold uppercase tracking-widest mt-4 hover:scale-[1.02] active:scale-95 transition shadow-lg shadow-cyan-500/20 text-white disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login to Academy"}
          </button>
          
          <p className="text-center text-slate-500 text-xs mt-4">
            Don't have an account? <span className="text-cyan-400 cursor-pointer hover:underline">Register</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- 2. HOME PAGE COMPONENT ---
const Home = () => (
  <>
    <header className="relative h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/hero.png" alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 px-12 md:px-24 max-w-4xl">
        <h2 className="text-cyan-400 text-sm font-bold tracking-[4px] uppercase mb-4 animate-pulse flex items-center gap-2">
          <Layers3 size={18} /> Premium Leadership Training
        </h2>
        <h1 className="text-6xl md:text-8xl font-black mb-8 italic uppercase leading-[0.85] text-white tracking-tighter">
          Unlock Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Future.</span>
        </h1>
        <Link to="/courses" className="bg-cyan-500 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition inline-flex items-center gap-2">
          Browse All Courses <ArrowRight size={18}/>
        </Link>
      </div>
    </header>

    <section className="py-24 px-8 max-w-7xl mx-auto -mt-20 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group relative h-[450px] rounded-[2rem] overflow-hidden shadow-2xl transition-transform hover:-translate-y-4">
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Tech" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] opacity-90"></div>
          <div className="absolute bottom-0 p-10">
            <h3 className="text-4xl font-black uppercase text-white leading-none mb-2">TECH<br/>STRATEGY</h3>
            <p className="text-cyan-400/70 text-sm font-bold">12 MODULES</p>
          </div>
        </div>
        <div className="group relative h-[450px] rounded-[2rem] overflow-hidden shadow-2xl transition-transform hover:-translate-y-4">
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Networking" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] opacity-90"></div>
          <div className="absolute bottom-0 p-10">
            <h3 className="text-4xl font-black uppercase text-white leading-none mb-2">ELITE<br/>NETWORKING</h3>
            <p className="text-blue-400/70 text-sm font-bold">8 WORKSHOPS</p>
          </div>
        </div>
        <div className="group relative h-[450px] rounded-[2rem] overflow-hidden shadow-2xl transition-transform hover:-translate-y-4">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Influence" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] opacity-90"></div>
          <div className="absolute bottom-0 p-10">
            <h3 className="text-4xl font-black uppercase text-white leading-none mb-2">PUBLIC<br/>INFLUENCE</h3>
            <p className="text-purple-400/70 text-sm font-bold">6 MASTERCLASSES</p>
          </div>
        </div>
      </div>
    </section>
  </>
);

// --- 3. COURSES PAGE ---
const Courses = () => (
  <div className="pt-32 px-12 pb-20 max-w-7xl mx-auto">
    <h2 className="text-4xl font-black text-white mb-10 italic uppercase border-l-4 border-cyan-500 pl-6">
      Our Leadership Modules
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-cyan-500 transition cursor-pointer group">
          <div className="h-40 bg-slate-800 rounded-xl mb-4 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-cyan-900 to-slate-900 group-hover:scale-110 transition duration-500"></div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">SCLA Module {item}</h3>
          <p className="text-slate-400 text-sm mb-4">Master the core principles of professional leadership and ethics.</p>
          <button className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Enroll Now +</button>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isSignInOpen, setSignInOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] font-sans">
        
        <SignInModal isOpen={isSignInOpen} onClose={() => setSignInOpen(false)} />
        
        <nav className="fixed w-full top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10 px-8 py-5">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-10">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center font-black text-white">S</div>
                <span className="font-black text-white text-xl tracking-tighter uppercase">SCLA</span>
              </Link>
              <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[2px] text-slate-400">
                <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
                <Link to="/courses" className="hover:text-cyan-400 transition">Courses</Link>
              </div>
            </div>

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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>

      </div>
    </Router>
  );
}