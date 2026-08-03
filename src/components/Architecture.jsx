import React, { useState } from 'react';
import { Cpu, Server, Shield, Layers, Box, Globe, Terminal, ArrowDown, Radio, Info, Check, Lock } from 'lucide-react';
import { architectureData } from '../data/architectureData';

export default function Architecture() {
  const [selectedNs, setSelectedNs] = useState('dev');
  const activeNsData = architectureData.namespaces.find(ns => ns.id === selectedNs);

  return (
    <section id="architecture" className="py-20 border-t border-slate-800/80 relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[300px] bg-blue-600/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Topology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Cluster Architecture & Isolation Boundary
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Click on any namespace node to inspect its ReplicaSet state, ResourceQuotas, and Zero-Trust NetworkPolicies.
          </p>
        </div>

        {/* Top Workflow Layer (User -> kubectl -> Minikube) */}
        <div className="mb-10 max-w-3xl mx-auto">
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-around gap-4 text-center font-mono text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-700">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Developer / Browser</span>
            </div>
            <ArrowDown className="w-4 h-4 text-slate-600 hidden sm:block rotate-[-90deg]" />
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-700">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>kubectl CLI (WSL2)</span>
            </div>
            <ArrowDown className="w-4 h-4 text-slate-600 hidden sm:block rotate-[-90deg]" />
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-700">
              <Server className="w-4 h-4 text-amber-400" />
              <span>Minikube Cluster Node</span>
            </div>
          </div>
        </div>

        {/* Main Cluster Container */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
          
          {/* Cluster Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                MINIKUBE SINGLE-NODE CLUSTER (Docker Driver v29.2.1)
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <Radio className="w-3.5 h-3.5 text-blue-400" />
              <span>Kubernetes Version: <strong className="text-blue-300">v1.35.1</strong></span>
            </div>
          </div>

          {/* Interactive Namespace Selector Tabs */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {architectureData.namespaces.map((ns) => {
              const isSelected = selectedNs === ns.id;
              return (
                <button
                  key={ns.id}
                  onClick={() => setSelectedNs(ns.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all border ${
                    isSelected
                      ? `${ns.badgeColor} ring-2 ring-blue-500/40 shadow-glow`
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>ns/{ns.id}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {ns.replicas} Pods
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3 Namespace Box Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {architectureData.namespaces.map((ns) => {
              const isSelected = selectedNs === ns.id;
              return (
                <div
                  key={ns.id}
                  onClick={() => setSelectedNs(ns.id)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 relative ${
                    isSelected
                      ? `bg-slate-900/90 ${ns.accentBorder} shadow-2xl ring-1 ring-blue-500/30 scale-[1.02]`
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 opacity-75 hover:opacity-100'
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-lg border font-mono text-xs font-bold ${ns.badgeColor}`}>
                      ns/{ns.id}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      ClusterIP: {ns.clusterIp}
                    </span>
                  </div>

                  {/* Deployment Spec */}
                  <div className="mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-1">
                      <span>Deployment: nginx-deployment</span>
                      <span className="text-blue-400 font-bold">{ns.replicas} Replicas</span>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400">
                      Image: {ns.image}
                    </div>
                  </div>

                  {/* Security Quota & NetPol Badges */}
                  <div className="mb-4 space-y-1.5 font-mono text-[10.5px]">
                    <div className="flex items-center justify-between bg-slate-900/90 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Shield className="w-3 h-3" />
                        <span>Quota Cap:</span>
                      </span>
                      <span>{ns.cpuQuota} • {ns.ramQuota}</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-900/90 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Lock className="w-3 h-3" />
                        <span>NetPol:</span>
                      </span>
                      <span className="text-emerald-400 font-semibold">Active Ingress</span>
                    </div>
                  </div>

                  {/* Pod Visual Boxes */}
                  <div className="mb-4">
                    <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center gap-1">
                      <Box className="w-3 h-3 text-slate-500" />
                      <span>ReplicaSet Pod Instances:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ns.pods.map((pod, i) => (
                        <div
                          key={i}
                          className="flex-1 min-w-[70px] bg-slate-800/80 p-2 rounded-lg border border-slate-700 text-center font-mono text-[10px]"
                        >
                          <div className="text-emerald-400 font-semibold truncate">{pod.name.split('-').pop()}</div>
                          <div className="text-slate-400">{pod.ip}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Endpoint Box */}
                  <div className="bg-blue-950/30 p-3 rounded-xl border border-blue-900/50">
                    <div className="text-xs font-mono font-semibold text-blue-300 flex items-center justify-between">
                      <span>Service: nginx-service</span>
                      <span className="text-[10px] bg-blue-500/20 px-1.5 py-0.5 rounded text-blue-300">Port 80</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                      DNS: {ns.dnsName}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Active Namespace Detailed Inspector Panel */}
          {activeNsData && (
            <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-blue-400" />
                  <h4 className="text-base font-bold text-white font-display">
                    Inspecting Namespace: <span className="font-mono text-blue-400">ns/{activeNsData.id}</span>
                  </h4>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  ResourceQuota Ceiling: <span className="text-amber-400 font-semibold">{activeNsData.cpuQuota} • {activeNsData.ramQuota} • Max {activeNsData.maxPodsQuota} Pods</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
                <div>
                  <h5 className="font-mono font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Purpose & Operational Role</span>
                  </h5>
                  <p className="text-slate-400 leading-relaxed mb-4">{activeNsData.purpose}</p>

                  <h5 className="font-mono font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zero-Trust NetworkPolicy Ingress</span>
                  </h5>
                  <code className="block bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-emerald-300 text-[11px] mb-4">
                    {activeNsData.netPolStatus}
                  </code>

                  <h5 className="font-mono font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>Fully Qualified Domain Name (FQDN)</span>
                  </h5>
                  <code className="block bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-emerald-300 text-[11px]">
                    {activeNsData.dnsName}
                  </code>
                </div>

                <div>
                  <h5 className="font-mono font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pod Container Statuses</span>
                  </h5>
                  <div className="space-y-2 font-mono text-[11px]">
                    {activeNsData.pods.map((pod, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-slate-200 truncate">{pod.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">{pod.ip}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">
                            {pod.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4 Isolation Mechanics Guarantees */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {architectureData.isolationRules.map((rule, idx) => (
              <div key={idx} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5 font-display">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{rule.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
