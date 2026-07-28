import React, { useState } from 'react';
import { PlayCircle, Terminal, CheckCircle2, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';
import { demoSteps } from '../data/demoData';

export default function LiveDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const activeDemo = demoSteps[currentStep];

  return (
    <section id="demo" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-3">
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Viva Presentation Walkthrough</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Live Demo Guide & Execution Output
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            5-step live demonstration workflow designed for quick 5-minute teacher evaluation.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {demoSteps.map((step, idx) => {
            const isActive = currentStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-500 shadow-glow ring-2 ring-blue-500/30'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-bold">
                  {step.number}
                </span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Terminal & Explainer Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Terminal Output Simulator */}
          <div className="lg:col-span-7 glass-panel rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Terminal Window Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  bash - wsl@ubuntu: ~/IBM
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Step {activeDemo.number} of 5
              </span>
            </div>

            {/* Terminal Execution Snippet */}
            <div className="p-6 bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto flex-1">
              <div className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <span>$</span>
                <span>{activeDemo.command}</span>
              </div>
              <pre className="text-slate-300 opacity-90 font-mono leading-relaxed whitespace-pre-wrap">
                {activeDemo.output}
              </pre>
            </div>

          </div>

          {/* Right: Key Viva Talking Points */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Teacher Key Talking Points</h3>
                  <p className="text-xs text-slate-400 font-mono">What to explain to your evaluator</p>
                </div>
              </div>

              <div className="space-y-4">
                {activeDemo.talkingPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Next/Prev buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:pointer-events-none text-xs font-mono border border-slate-800 transition-colors"
              >
                Previous Step
              </button>
              <button
                onClick={() => setCurrentStep(prev => Math.min(demoSteps.length - 1, prev + 1))}
                disabled={currentStep === demoSteps.length - 1}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:pointer-events-none text-xs font-mono shadow-glow transition-colors flex items-center gap-1.5"
              >
                <span>Next Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
