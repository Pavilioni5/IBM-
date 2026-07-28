import React from 'react';
import { ShieldCheck, HelpCircle, Layers, Target, Server, Cpu, CheckCircle } from 'lucide-react';

const conceptCards = [
  {
    title: "What is Kubernetes?",
    icon: Server,
    color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30",
    iconColor: "text-blue-400",
    desc: "Kubernetes (K8s) is an open-source container orchestration system that automates deployment, scaling, load balancing, and management of containerized applications."
  },
  {
    title: "Why Kubernetes?",
    icon: Cpu,
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
    iconColor: "text-emerald-400",
    desc: "Provides self-healing container restarts, horizontal scaling, zero-downtime rolling updates, and unified infrastructure control without vendor lock-in."
  },
  {
    title: "Why Namespace Isolation?",
    icon: Layers,
    color: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
    iconColor: "text-amber-400",
    desc: "Allows dev, test, and production teams to share one physical cluster securely. Keeps object names, DNS endpoints, and ReplicaSets strictly segregated."
  },
  {
    title: "Project Objectives",
    icon: Target,
    color: "from-purple-500/20 to-pink-500/10 border-purple-500/30",
    iconColor: "text-purple-400",
    desc: "Demonstrate declarative multi-environment deployment using standard kubectl commands, Minikube local cluster, ClusterIP services, and scaling verification."
  }
];

const envMatrix = [
  {
    env: "dev",
    label: "Development",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    badge: "Active Iteration",
    replicas: 2,
    image: "nginx:1.25",
    svc: "ClusterIP",
    role: "Dev team testing, pinned image version for environment stability."
  },
  {
    env: "test",
    label: "Testing",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    badge: "QA / Automated CI",
    replicas: 1,
    image: "nginx:latest",
    svc: "ClusterIP",
    role: "Integration and automated functional testing with minimal resource overhead."
  },
  {
    env: "prod",
    label: "Production",
    color: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    badge: "High Availability",
    replicas: 3,
    image: "nginx:latest",
    svc: "ClusterIP",
    role: "Production-ready 3-pod redundancy for zero-downtime traffic load balancing."
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Core Concepts & Thesis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            About The Project
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Understand how Kubernetes namespace partitioning enables multi-tenant enterprise software delivery pipelines on shared hardware.
          </p>
        </div>

        {/* 4 Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {conceptCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`glass-panel p-6 rounded-2xl border bg-gradient-to-b ${card.color} hover:-translate-y-1 transition-all duration-300 shadow-lg`}
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-900/80 flex items-center justify-center mb-5 ${card.iconColor} border border-slate-800 shadow-inner`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-display">{card.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Environment Matrix Table */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Namespace Environment Comparison</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Same container application shape across 3 distinct isolation profiles.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              Cluster: <span className="text-blue-400 font-semibold">minikube</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Environment</th>
                  <th className="py-3 px-4">Profile</th>
                  <th className="py-3 px-4">Default Replicas</th>
                  <th className="py-3 px-4">Container Image</th>
                  <th className="py-3 px-4">Service Type</th>
                  <th className="py-3 px-4">Operational Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {envMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold">
                      <span className={`px-2.5 py-1 rounded-lg border text-xs ${row.color}`}>
                        ns/{row.env}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-200">{row.badge}</td>
                    <td className="py-4 px-4 font-mono text-slate-300 font-bold">{row.replicas} Pods</td>
                    <td className="py-4 px-4 font-mono text-emerald-400 text-xs">{row.image}</td>
                    <td className="py-4 px-4 font-mono text-blue-400 text-xs">{row.svc}</td>
                    <td className="py-4 px-4 text-slate-300 text-xs leading-normal">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
