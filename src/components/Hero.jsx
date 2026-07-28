import React, { useState } from 'react';
import { Shield, Play, Code, CheckCircle2, Copy, Check, Terminal, ArrowRight, Server, Layers, Cpu, Github } from 'lucide-react';

const techBadges = [
  { name: 'Kubernetes', version: 'v1.35.1', color: 'border-blue-500/30 text-blue-400 bg-blue-500/10' },
  { name: 'Minikube', version: 'v1.38.1', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' },
  { name: 'Docker', version: 'v29.2.1', color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10' },
  { name: 'Ubuntu WSL2', version: '22.04', color: 'border-amber-500/30 text-amber-400 bg-amber-500/10' },
  { name: 'GitHub', version: 'Repository', color: 'border-purple-500/30 text-purple-400 bg-purple-500/10' },
  { name: 'VS Code', version: 'IDE', color: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10' }
];

const stats = [
  { label: 'Namespaces', value: '3', desc: 'dev • test • prod', icon: Layers },
  { label: 'Deployments', value: '3', desc: 'Independent ReplicaSets', icon: Server },
  { label: 'Services', value: '3', desc: 'ClusterIP Load Balancers', icon: Cpu },
  { label: 'Total Pods', value: '8+', desc: 'Isolated container runtime', icon: Shield },
  { label: 'YAML Manifests', value: '10+', desc: 'Declarative K8s configs', icon: Code },
  { label: 'K8s Commands', value: '40+', desc: 'CLI workflow documentation', icon: Terminal }
];

export default function Hero({ setActiveSection }) {
  const [copied, setCopied] = useState(false);
  const commandText = "kubectl apply -f namespaces/ && kubectl apply -f deployments/";

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      
      {/* Ambient background glow spheres */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[400px] h-[300px] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono backdrop-blur-md shadow-glow-ibm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>IBM Internship Project • Multi-Environment K8s Architecture</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            IBM Kubernetes <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
              Namespace Isolation
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Deploy, scale, and manage isolated software environments (<span className="text-emerald-400 font-mono font-medium">dev</span>, <span className="text-amber-400 font-mono font-medium">test</span>, and <span className="text-rose-400 font-mono font-medium">prod</span>) on a single Minikube cluster using standard <code className="text-blue-300 font-mono text-base bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">kubectl</code> declarative manifests.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => {
                setActiveSection('architecture');
                document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-glow hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Explore Architecture</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('yaml');
                document.getElementById('yaml')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all hover:border-slate-500 hover:-translate-y-0.5"
            >
              <Code className="w-4 h-4 text-blue-400" />
              <span>YAML Explorer</span>
            </button>

            <a
              href="https://github.com/Pavilioni5/IBM-"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all hover:border-slate-500 hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4 text-purple-400" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Quick CLI Banner */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 overflow-hidden">
                <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-500">$</span>
                <span className="text-emerald-300 truncate">{commandText}</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 text-[11px] shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Tech Badges Grid */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {techBadges.map((badge, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-medium backdrop-blur-md ${badge.color}`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 opacity-80" />
              <span>{badge.name}</span>
              <span className="opacity-60 text-[11px]">({badge.version})</span>
            </div>
          ))}
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all text-center group"
              >
                <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-0.5 group-hover:text-blue-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-200 mb-1">{stat.label}</div>
                <div className="text-[10px] text-slate-400 font-mono truncate">{stat.desc}</div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
