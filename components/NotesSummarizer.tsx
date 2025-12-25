
import React, { useState } from 'react';
import { summarizeNotes } from '../services/geminiService';
import { NoteSummary } from '../types';

const NotesSummarizer: React.FC = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NoteSummary | null>(null);

  const handleSummarize = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const summary = await summarizeNotes(content);
      setResult(summary);
    } catch (err) {
      console.error(err);
      alert("Failed to summarize notes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Notes Summarizer</h2>
        <p className="text-slate-500">Paste your long lecture notes or textbook chapters to get instant insights.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your notes here..."
            className="w-full h-[500px] p-6 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white shadow-sm"
          />
          <button 
            onClick={handleSummarize}
            disabled={loading || !content}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span>Summarize Now</span>}
          </button>
        </div>

        <div className="space-y-6">
          {result ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6 h-[560px] overflow-y-auto">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Executive Summary</h3>
                <p className="text-slate-600 leading-relaxed">{result.summary}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Key Concepts</h3>
                <div className="flex flex-wrap gap-2">
                  {result.keyConcepts.map((concept, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-xl">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Action Items</h3>
                <ul className="space-y-2">
                  {result.actionItems.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-slate-600">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-[560px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <div className="text-5xl mb-4">📑</div>
              <p>Your summary will appear here once you paste and process your notes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesSummarizer;
