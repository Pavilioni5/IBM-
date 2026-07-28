import React from 'react';
import { User, Award, GraduationCap, Building, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

export default function AboutMe() {
  return (
    <section id="aboutme" className="py-20 border-t border-slate-800/80 relative">
      
      {/* Background radial highlight */}
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Author Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            About The Author
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Project submission profile for IBM Cloud & Kubernetes Internship Defense.
          </p>
        </div>

        {/* Profile Card */}
        <div className="max-w-3xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Top Decorative Banner */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400" />

          <div className="flex flex-col sm:flex-row items-center gap-8">
            
            {/* Avatar Circle */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 shadow-glow-ibm shrink-0">
              <div className="w-full h-full bg-[#0B0F19] rounded-[22px] flex items-center justify-center text-white">
                <User className="w-12 h-12 text-blue-400" />
              </div>
            </div>

            {/* Profile Meta Info */}
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Aniket
                </h3>
                <p className="text-blue-400 font-mono text-sm font-semibold mt-1">
                  IBM Cloud & Kubernetes Intern
                </p>
              </div>

              {/* Details Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-center sm:justify-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <Building className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>IBM Internship Program</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Computer Science & Eng.</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <Award className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>K8s Namespace Isolation</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <User className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Viva Defense Ready</span>
                </div>
              </div>

              {/* Social Link Buttons */}
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-4 border-t border-slate-800/80">
                <a
                  href="https://github.com/Aniket3166"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-mono transition-colors shadow-glow"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-blue-200" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
