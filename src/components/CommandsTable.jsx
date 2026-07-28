import React, { useState, useMemo } from 'react';
import { Terminal, Search, Copy, Check, Filter } from 'lucide-react';
import { commandsList, commandCategories } from '../data/commandsData';

export default function CommandsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [copiedCmd, setCopiedCmd] = useState(null);

  const filteredCommands = useMemo(() => {
    return commandsList.filter((cmd) => {
      const matchesSearch = 
        cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCat === 'All' || cmd.category === selectedCat;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCat]);

  const handleCopy = (commandText, index) => {
    navigator.clipboard.writeText(commandText);
    setCopiedCmd(index);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section id="commands" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI Reference Manual</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Terminal Commands Table
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Searchable index of 40+ essential <code className="text-emerald-400 font-mono">kubectl</code> and <code className="text-blue-400 font-mono">minikube</code> terminal commands.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            
            {/* Search Input Box */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search commands (e.g. scale, rollout, ns)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            {/* Category Pills Header */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 ml-auto">
              <Filter className="w-3.5 h-3.5 text-blue-400" />
              <span>Showing: <strong className="text-white">{filteredCommands.length}</strong> commands</span>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {commandCategories.map((cat) => {
              const isActive = selectedCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-glow'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Commands Table */}
        <div className="glass-panel rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono uppercase tracking-wider">
                  <th className="py-4 px-6 w-1/3">Command</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Description</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/60 transition-colors group">
                      <td className="py-4 px-6 font-mono text-emerald-300 font-medium">
                        <code className="bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 block w-fit max-w-md truncate">
                          $ {cmd.command}
                        </code>
                      </td>
                      <td className="py-4 px-6 font-mono">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                          {cmd.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-300 leading-relaxed font-sans">
                        {cmd.description}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleCopy(cmd.command, idx)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-[11px] border border-slate-700 inline-flex items-center gap-1.5 transition-colors"
                        >
                          {copiedCmd === idx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-slate-400" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500 font-mono">
                      No matching commands found for query "{searchTerm}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
