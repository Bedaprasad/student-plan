
import React, { useState } from 'react';
import { academicSearch } from '../services/geminiService';
import { GroundingSource } from '../types';

const ResearchAI: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState<GroundingSource[]>([]);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const result = await academicSearch(query);
      setAnswer(result.answer || '');
      // Transform grounding chunks to useful links
      const formattedSources = result.sources
        .map((chunk: any) => chunk.web)
        .filter((web: any) => web && web.uri);
      setSources(formattedSources);
    } catch (err) {
      console.error(err);
      alert("Research failed. Grounding tool might be restricted in this region.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Academic Research AI</h2>
        <p className="text-slate-500">Grounded in Google Search for real-time accurate data and citations.</p>
      </header>

      <div className="relative group">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a complex academic question..."
          className="w-full pl-6 pr-32 py-5 rounded-2xl border border-slate-200 shadow-xl focus:ring-4 focus:ring-blue-100 outline-none text-lg transition-all"
        />
        <button 
          onClick={handleSearch}
          disabled={loading || !query}
          className="absolute right-3 top-3 bottom-3 bg-slate-900 text-white px-6 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:bg-slate-300"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Research"}
        </button>
      </div>

      {answer && (
        <div className="space-y-6 animate-in slide-in-from-top-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Gemini Analysis</h3>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
              {answer.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
          </div>

          {sources.length > 0 && (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                <span className="mr-2">🔗</span> Verified Sources
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sources.map((src, i) => (
                  <a 
                    key={i} 
                    href={src.web?.uri} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{src.web?.title || 'External Source'}</p>
                      <p className="text-[10px] text-slate-400 truncate">{src.web?.uri}</p>
                    </div>
                    <span className="text-slate-300 group-hover:text-blue-500">↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="py-20 flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Synthesizing real-time information...</p>
        </div>
      )}
    </div>
  );
};

export default ResearchAI;
