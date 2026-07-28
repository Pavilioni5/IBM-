import React, { useState, useEffect } from 'react';
import { Box, Terminal, Cpu, Layers, GitBranch, Code, ShieldCheck, PlayCircle, Image, BookOpen, User, Menu, X, ExternalLink } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Box },
  { id: 'about', label: 'About', icon: ShieldCheck },
  { id: 'architecture', label: 'Architecture', icon: Cpu },
  { id: 'installation', label: 'Installation', icon: Layers },
  { id: 'structure', label: 'Structure', icon: GitBranch },
  { id: 'yaml', label: 'YAML Explorer', icon: Code },
  { id: 'commands', label: 'Commands', icon: Terminal },
  { id: 'demo', label: 'Live Demo', icon: PlayCircle },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'documentation', label: 'Docs', icon: BookOpen }
];

export default function Navbar({ activeSection, setActiveSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-glow-ibm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <Box className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg text-white tracking-tight">IBM K8s</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-medium">v1.35</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">Namespace Isolation Portal</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-glow'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Actions / Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 p-4 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}
