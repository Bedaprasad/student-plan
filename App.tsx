
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Flashcards from './components/Flashcards';
import StudyPlanner from './components/StudyPlanner';
import NotesSummarizer from './components/NotesSummarizer';
import ResearchAI from './components/ResearchAI';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-slate-50 text-slate-900">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/planner" element={<StudyPlanner />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/notes" element={<NotesSummarizer />} />
              <Route path="/research" element={<ResearchAI />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
