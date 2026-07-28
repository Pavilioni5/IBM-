import React from 'react';
import { ArrowUp, Heart, Box } from 'lucide-react';

export default function Footer({ setActiveSection }) {
  const scrollToTop = () => {
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 py-12 bg-slate-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-white text-base">IBM Kubernetes Namespace Isolation</span>
              <p className="text-xs text-slate-400 font-mono">Documentation Portal • v1.0.0</p>
            </div>
          </div>

          {/* Technology Badges Row */}
          <div className="flex flex-wrap justify-center gap-2 font-mono text-[11px] text-slate-400">
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">React</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Tailwind CSS</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Vite</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Minikube</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">kubectl</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors text-xs font-mono"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          </button>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline" /> for IBM Kubernetes Project Defense
          </p>
          <p>© {new Date().getFullYear()} IBM Kubernetes Project</p>
        </div>

      </div>
    </footer>
  );
}
