import React, { useState } from 'react';
import { GitBranch, Folder, FolderOpen, FileText, ChevronRight, ChevronDown, Code, Info } from 'lucide-react';

const treeData = [
  {
    name: 'namespaces',
    type: 'folder',
    desc: 'Kubernetes Namespace declarative manifests',
    children: [
      { name: 'dev-namespace.yaml', type: 'file', size: '57 B', lines: 5, desc: 'Namespace definition for dev environment' },
      { name: 'test-namespace.yaml', type: 'file', size: '58 B', lines: 5, desc: 'Namespace definition for test environment' },
      { name: 'prod-namespace.yaml', type: 'file', size: '58 B', lines: 5, desc: 'Namespace definition for prod environment' }
    ]
  },
  {
    name: 'deployments',
    type: 'folder',
    desc: 'NGINX Workload Deployments and ReplicaSets',
    children: [
      { name: 'nginx-dev.yaml', type: 'file', size: '361 B', lines: 26, desc: 'Dev deployment manifest with 2 replicas & nginx:1.25' },
      { name: 'nginx-test.yaml', type: 'file', size: '364 B', lines: 26, desc: 'Test deployment manifest with 1 replica & nginx:latest' },
      { name: 'nginx-prod.yaml', type: 'file', size: '362 B', lines: 26, desc: 'Prod deployment manifest with 3 replicas & nginx:latest' }
    ]
  },
  {
    name: 'services',
    type: 'folder',
    desc: 'ClusterIP internal load balancer manifests',
    children: [
      { name: 'nginx-dev-service.yaml', type: 'file', size: '213 B', lines: 17, desc: 'ClusterIP service for ns/dev targeting app=nginx' },
      { name: 'nginx-test-service.yaml', type: 'file', size: '208 B', lines: 17, desc: 'ClusterIP service for ns/test targeting app=nginx' },
      { name: 'nginx-prod-service.yaml', type: 'file', size: '208 B', lines: 17, desc: 'ClusterIP service for ns/prod targeting app=nginx' }
    ]
  },
  {
    name: 'README.md',
    type: 'file',
    size: '15.0 KB',
    lines: 488,
    desc: 'Full project technical documentation, architecture specs, and step-by-step verification guide.'
  },
  {
    name: 'logs',
    type: 'file',
    size: '27.7 KB',
    lines: 420,
    desc: 'Recorded terminal execution outputs and kubectl status dump logs.'
  }
];

export default function ProjectStructure() {
  const [openFolders, setOpenFolders] = useState({ namespaces: true, deployments: true, services: true });
  const [selectedFile, setSelectedFile] = useState(treeData[0].children[0]);

  const toggleFolder = (folderName) => {
    setOpenFolders(prev => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  return (
    <section id="structure" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-3">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Workspace Layout</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Interactive Project Structure
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Explore the directory tree layout and inspect individual manifest file details.
          </p>
        </div>

        {/* Dual Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Pane: Interactive Folder Tree */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 font-mono text-xs text-slate-400">
              <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Folder className="w-4 h-4 text-blue-400" />
                IBM Workspace Directory
              </span>
              <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded">Root /</span>
            </div>

            <div className="space-y-1 font-mono text-xs">
              {treeData.map((item, idx) => {
                if (item.type === 'folder') {
                  const isOpen = openFolders[item.name];
                  return (
                    <div key={idx} className="select-none">
                      <div
                        onClick={() => toggleFolder(item.name)}
                        className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-800/60 cursor-pointer text-slate-300 transition-colors"
                      >
                        {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                        {isOpen ? <FolderOpen className="w-4 h-4 text-blue-400" /> : <Folder className="w-4 h-4 text-blue-400" />}
                        <span className="font-semibold text-white">{item.name}/</span>
                        <span className="text-[10px] text-slate-400 ml-auto font-normal">
                          {item.children.length} files
                        </span>
                      </div>

                      {/* Sub-items */}
                      {isOpen && (
                        <div className="ml-6 pl-2 border-l border-slate-800 space-y-1 my-1">
                          {item.children.map((child, childIdx) => {
                            const isSelected = selectedFile?.name === child.name;
                            return (
                              <div
                                key={childIdx}
                                onClick={() => setSelectedFile(child)}
                                className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all ${
                                  isSelected
                                    ? 'bg-blue-600 text-white shadow-glow font-medium'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                                }`}
                              >
                                <Code className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                                <span className="truncate">{child.name}</span>
                                <span className={`text-[10px] ml-auto font-mono ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                                  {child.size}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                } else {
                  const isSelected = selectedFile?.name === item.name;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedFile(item)}
                      className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-glow font-medium'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                    >
                      <FileText className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-400'}`} />
                      <span className="truncate">{item.name}</span>
                      <span className={`text-[10px] ml-auto font-mono ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                        {item.size}
                      </span>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* Right Pane: Selected File Details Inspector */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between">
            {selectedFile ? (
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-blue-400" />
                    <div>
                      <h3 className="text-lg font-bold text-white font-mono">{selectedFile.name}</h3>
                      <p className="text-xs text-slate-400 font-mono">
                        Size: {selectedFile.size} • Lines: {selectedFile.lines}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                    Verified Asset
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                    <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                      {selectedFile.desc}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-blue-400" />
                      <span>Role in Architecture</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                        <span>Declaratively manages Kubernetes object state inside Minikube.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>Ensures idempotent deployments using standard <code className="text-emerald-300 font-mono">kubectl apply -f</code> workflows.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-500 font-mono text-sm">
                Select a file from the workspace tree to view details.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
