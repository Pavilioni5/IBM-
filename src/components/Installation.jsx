import React, { useState } from 'react';
import { Layers, Terminal, Copy, Check, CheckCircle2, ArrowDown } from 'lucide-react';
import { timelineSteps } from '../data/timelineData';

export default function Installation() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="installation" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Deployment Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Step-by-Step Installation Guide
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Follow this vertical timeline to provision the Minikube cluster, apply YAML manifests, and expose application endpoints.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-amber-500 -translate-x-1/2 opacity-30 hidden sm:block" />

          <div className="space-y-8">
            {timelineSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row items-center gap-6 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full sm:w-[calc(50%-2rem)]">
                    <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all shadow-xl group">
                      
                      {/* Step Number & Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-bold text-blue-400 px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20">
                          Step {step.step}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                          {step.badge}
                        </span>
                      </div>

                      {/* Title & Explanation */}
                      <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-blue-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                        {step.explanation}
                      </p>

                      {/* Code Block with Copy Button */}
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 relative group/code">
                        <pre className="overflow-x-auto text-emerald-300 pr-12 font-mono leading-relaxed">
                          {step.command}
                        </pre>
                        <button
                          onClick={() => handleCopy(step.command, idx)}
                          className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700 opacity-80 group-hover/code:opacity-100"
                          title="Copy code snippet"
                        >
                          {copiedIndex === idx ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Center Timeline Node Marker */}
                  <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center font-mono text-xs font-bold text-blue-400 shrink-0 z-10 shadow-glow hidden sm:flex">
                    {step.step}
                  </div>

                  {/* Empty Spacer Column for layout symmetry */}
                  <div className="w-full sm:w-[calc(50%-2rem)] hidden sm:block" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
