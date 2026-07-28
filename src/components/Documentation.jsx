import React, { useState } from 'react';
import { BookOpen, FileText, Code, CheckCircle, ExternalLink, Terminal } from 'lucide-react';

export default function Documentation() {
  const [activeDocTab, setActiveDocTab] = useState('readme');

  return (
    <section id="documentation" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Resource Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Documentation Center
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Access complete technical documentation, raw terminal execution logs, and licensing metadata.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {[
            { id: 'readme', label: 'README.md Documentation', icon: FileText },
            { id: 'logs', label: 'Terminal Logs Output', icon: Terminal }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDocTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDocTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-500 shadow-glow'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Document Display Panel */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
          {activeDocTab === 'readme' ? (
            <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 font-mono text-xs text-slate-400">
                <span className="text-emerald-400 font-bold">README.md Overview</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display mb-2">
                  Kubernetes Namespace Isolation using Minikube
                </h3>
                <p className="text-slate-300">
                  This project demonstrates <strong>namespace-based environment isolation</strong> in Kubernetes, using a local Minikube cluster. A single NGINX application is deployed independently into three isolated namespaces — <strong>dev</strong>, <strong>test</strong>, and <strong>prod</strong> — to simulate a realistic multi-environment software delivery pipeline.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <h4 className="font-mono text-xs font-bold text-blue-400 mb-2">Key Learnings</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li>• Namespaces scope resources logically on shared physical hardware.</li>
                    <li>• Deployments enable zero-downtime rolling updates and replica management.</li>
                    <li>• ClusterIP services provide secure internal DNS load balancing endpoints.</li>
                  </ul>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <h4 className="font-mono text-xs font-bold text-emerald-400 mb-2">Tested Tool Versions</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                    <li>• Kubernetes: v1.35.1</li>
                    <li>• Minikube: v1.38.1</li>
                    <li>• Docker Engine: 29.2.1</li>
                    <li>• OS: Ubuntu 22.04 on WSL2</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 font-mono text-xs text-slate-400">
                <span className="text-emerald-400 font-bold">session.log & terminal logs</span>
                <span>Size: 27.7 KB</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-300 leading-relaxed max-h-[400px] overflow-y-auto">
                <pre>
                  {`$ kubectl apply -f namespaces/
namespace/dev created
namespace/test created
namespace/prod created

$ kubectl apply -f deployments/
deployment.apps/nginx-deployment created (dev)
deployment.apps/nginx-deployment created (test)
deployment.apps/nginx-deployment created (prod)

$ kubectl get pods -A
dev    nginx-deployment-5fd577784b-6jblg   1/1   Running   0   7m
dev    nginx-deployment-5fd577784b-kh2gh   1/1   Running   0   7m
test   nginx-deployment-59f86b59ff-tn4jn   1/1   Running   0   14m
prod   nginx-deployment-59f86b59ff-ctq4l   1/1   Running   0   8m
prod   nginx-deployment-59f86b59ff-hx45x   1/1   Running   0   8m
prod   nginx-deployment-59f86b59ff-z2q7n   1/1   Running   0   8m`}
                </pre>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
