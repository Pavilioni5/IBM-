import React, { useState } from 'react';
import { Code, Copy, Check, FileCode, Layers, Server, Cpu, HelpCircle, Shield, Lock } from 'lucide-react';
import { yamlManifests } from '../data/yamlData';

export default function YAMLExplorer() {
  const [activeEnv, setActiveEnv] = useState('dev');
  const [activeType, setActiveType] = useState('deployment');
  const [copied, setCopied] = useState(false);

  const manifestData = yamlManifests[activeEnv]?.[activeType];

  const handleCopy = () => {
    if (manifestData?.raw) {
      navigator.clipboard.writeText(manifestData.raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="yaml" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-3">
            <Code className="w-3.5 h-3.5" />
            <span>Declarative Manifest Viewer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            YAML Explorer & Field Breakdown
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Select an environment and resource type to inspect exact Kubernetes manifest syntax and line-by-line field explanations.
          </p>
        </div>

        {/* Control Bars */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Environment Tabs (dev, test, prod) */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 w-full lg:w-auto">
            {['dev', 'test', 'prod'].map((env) => {
              const isActive = activeEnv === env;
              return (
                <button
                  key={env}
                  onClick={() => setActiveEnv(env)}
                  className={`flex-1 lg:flex-initial px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                    isActive
                      ? env === 'dev' ? 'bg-emerald-600 text-white shadow-glow'
                        : env === 'test' ? 'bg-amber-600 text-white shadow-glow'
                        : 'bg-rose-600 text-white shadow-glow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  ns/{env}
                </button>
              );
            })}
          </div>

          {/* Resource Type Selector (Namespace, Deployment, Service, ResourceQuota, NetworkPolicy) */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 w-full lg:w-auto">
            {[
              { id: 'namespace', label: 'Namespace', icon: Layers },
              { id: 'deployment', label: 'Deployment', icon: Server },
              { id: 'service', label: 'Service', icon: Cpu },
              { id: 'quota', label: 'ResourceQuota', icon: Shield },
              { id: 'netpol', label: 'NetworkPolicy', icon: Lock }
            ].map((res) => {
              const Icon = res.icon;
              const isActive = activeType === res.id;
              return (
                <button
                  key={res.id}
                  onClick={() => setActiveType(res.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-glow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{res.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Dual Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Pane: YAML Code Viewer */}
          <div className="lg:col-span-7 glass-panel rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Top Code Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs text-slate-300 font-semibold">
                  {manifestData?.filename}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy YAML'}</span>
              </button>
            </div>

            {/* Syntax Code Content */}
            <div className="p-6 bg-slate-950/90 overflow-x-auto flex-1 font-mono text-xs leading-relaxed text-slate-200">
              <pre>
                {manifestData?.raw.split('\n').map((line, i) => (
                  <div key={i} className="table-row hover:bg-slate-900/80 transition-colors px-2 rounded">
                    <span className="table-cell select-none text-slate-600 pr-4 text-right">{i + 1}</span>
                    <span className="table-cell">
                      {line.includes(':') ? (
                        <>
                          <span className="yaml-key">{line.split(':')[0]}:</span>
                          <span className="yaml-string">{line.substring(line.indexOf(':') + 1)}</span>
                        </>
                      ) : (
                        <span>{line}</span>
                      )}
                    </span>
                  </div>
                ))}
              </pre>
            </div>

          </div>

          {/* Right Pane: Field Explainer Annotations */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Field Explanations</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Understanding key Kubernetes declarative directives.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {manifestData?.annotations.map((ann, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80">
                    <div className="font-mono text-xs font-bold text-emerald-400 mb-1">
                      {ann.field}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {ann.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Environment: <strong className="text-white uppercase">{activeEnv}</strong></span>
              <span>Kind: <strong className="text-blue-400 uppercase">{activeType}</strong></span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
