import React, { useState } from 'react';
import { Image, Maximize2, X, Terminal, Filter, Code } from 'lucide-react';
import { galleryItems, galleryCategories } from '../data/galleryData';

export default function Gallery() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const filteredItems = selectedCat === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCat);

  return (
    <section id="gallery" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-3">
            <Image className="w-3.5 h-3.5" />
            <span>Terminal & Dashboard Visuals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Project Evidence & Visual Gallery
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Click any screenshot card to inspect high-resolution terminal outputs and execution logs.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {galleryCategories.map((cat) => {
            const isActive = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
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

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="glass-panel rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group shadow-xl overflow-hidden flex flex-col justify-between"
            >
              {/* Terminal Snippet Box */}
              <div className="bg-slate-950 p-4 font-mono text-[11px] text-slate-300 border-b border-slate-800 relative group-hover:bg-slate-900 transition-colors h-48 overflow-hidden">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800/80">
                  <span className="text-emerald-400 font-bold text-[10px]">{item.badge}</span>
                  <Maximize2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <pre className="text-slate-400 font-mono leading-relaxed truncate whitespace-pre-wrap">
                  {item.codeSnippet}
                </pre>
              </div>

              {/* Card Meta Footer */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-white font-display group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {activeModalItem && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="glass-panel w-full max-w-4xl rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 bg-slate-950 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-blue-400" />
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-display">
                      {activeModalItem.title}
                    </h3>
                    <span className="text-xs font-mono text-emerald-400">
                      {activeModalItem.badge}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Code Output */}
              <div className="p-6 bg-slate-950 font-mono text-xs text-slate-200 overflow-y-auto flex-1 leading-relaxed">
                <pre className="whitespace-pre-wrap font-mono text-slate-300">
                  {activeModalItem.codeSnippet}
                </pre>
              </div>

              {/* Modal Footer Description */}
              <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 text-xs text-slate-300">
                {activeModalItem.description}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
