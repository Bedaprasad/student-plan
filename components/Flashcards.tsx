
import React, { useState } from 'react';
import { generateFlashcards } from '../services/geminiService';
import { Flashcard } from '../types';

const Flashcards: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const newCards = await generateFlashcards(topic);
      setCards(newCards);
      setCurrentIndex(0);
      setIsFlipped(false);
    } catch (err) {
      console.error(err);
      alert("Failed to generate cards. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">AI Flashcard Generator</h2>
        <p className="text-slate-500">Master any topic with instant study cards powered by Gemini.</p>
      </header>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g. Molecular Biology, WWII, React Hooks)"
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button 
          onClick={handleGenerate}
          disabled={loading || !topic}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 flex items-center justify-center space-x-2"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span>Generate</span>}
        </button>
      </div>

      {cards.length > 0 && (
        <div className="space-y-8">
          <div className="relative h-80 w-full perspective-1000">
             <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className={`relative w-full h-full duration-500 cursor-pointer shadow-xl rounded-3xl preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-3xl flex flex-col items-center justify-center p-12 text-center border-2 border-blue-100">
                <span className="text-sm font-bold text-blue-600 mb-4 uppercase tracking-widest">Question</span>
                <p className="text-2xl font-medium text-slate-800 leading-relaxed">{cards[currentIndex].front}</p>
                <div className="mt-8 text-slate-400 text-sm italic">Click to flip</div>
              </div>
              {/* Back */}
              <div className="absolute inset-0 backface-hidden bg-blue-600 text-white rounded-3xl flex flex-col items-center justify-center p-12 text-center rotate-y-180 shadow-2xl">
                <span className="text-sm font-bold text-white/70 mb-4 uppercase tracking-widest">Answer</span>
                <p className="text-2xl font-medium leading-relaxed">{cards[currentIndex].back}</p>
                <div className="mt-8 text-white/50 text-sm italic">Click to flip back</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button 
              onClick={prevCard}
              className="p-4 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            >
              ⬅️
            </button>
            <div className="text-slate-500 font-medium">
              Card {currentIndex + 1} of {cards.length}
            </div>
            <button 
              onClick={nextCard}
              className="p-4 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            >
              ➡️
            </button>
          </div>
        </div>
      )}

      {cards.length === 0 && !loading && (
        <div className="py-20 flex flex-col items-center text-slate-400">
          <div className="text-6xl mb-4">🎴</div>
          <p>No flashcards yet. Type a topic above to start learning.</p>
        </div>
      )}

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default Flashcards;
