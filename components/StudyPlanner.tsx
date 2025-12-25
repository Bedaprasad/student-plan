
import React, { useState } from 'react';
import { generateStudyPlan } from '../services/geminiService';
import { StudyPlan } from '../types';

const StudyPlanner: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<StudyPlan | null>(null);

  const handleCreatePlan = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const newPlan = await generateStudyPlan(topic, days);
      setPlan(newPlan);
    } catch (err) {
      console.error(err);
      alert("Failed to generate plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
       <header className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Smart Study Planner</h2>
        <p className="text-slate-500">AI-optimized schedules tailored to your exams and deadlines.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">What are you studying for?</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Final Calculus Exam"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Days remaining?</label>
            <input 
              type="number" 
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              min="1"
              max="90"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <button 
          onClick={handleCreatePlan}
          disabled={loading || !topic}
          className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span>Generate Intensive Plan</span>}
        </button>
      </div>

      {plan && (
        <div className="space-y-6 animate-in slide-in-from-top-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-blue-600 p-6 text-white">
              <h3 className="text-xl font-bold">{plan.title}</h3>
              <p className="text-blue-100 text-sm">Target: {days} Days</p>
            </div>
            <div className="divide-y divide-slate-100">
              {plan.schedule.map((item, idx) => (
                <div key={idx} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 font-bold text-blue-600">{item.time}</div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.activity}</h4>
                      <p className="text-sm text-slate-500">{item.topic}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">{item.duration}</span>
                    <button className="text-blue-600 hover:text-blue-800">✅</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
             <button className="px-6 py-2 rounded-xl border border-slate-200 font-semibold hover:bg-slate-50">Download PDF</button>
             <button className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">Add to Calendar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanner;
