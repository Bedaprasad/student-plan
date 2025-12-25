
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Study Planner', path: '/planner', icon: '📅' },
    { name: 'Flashcards', path: '/flashcards', icon: '🎴' },
    { name: 'Notes Summarizer', path: '/notes', icon: '📝' },
    { name: 'Research AI', path: '/research', icon: '🔍' },
  ];

  return (
    <aside className="w-64 bg-white h-full border-r border-slate-200 hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AcademiaAI
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-900 rounded-xl p-4 text-white">
          <p className="text-xs text-slate-400 mb-1">PRO FEATURES</p>
          <p className="text-sm font-medium">Smart Scheduling</p>
          <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-semibold transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
