
import React, { useState, useEffect } from 'react';
import { Task } from '../types';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName] = useState("Alex");

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      const initial = [
        { id: '1', title: 'Complete Physics Lab Report', dueDate: '2023-11-20', priority: 'high', completed: false, category: 'Science' },
        { id: '2', title: 'Review History Chapter 4', dueDate: '2023-11-22', priority: 'medium', completed: false, category: 'Arts' },
      ];
      setTasks(initial as Task[]);
      localStorage.setItem('tasks', JSON.stringify(initial));
    }
  }, []);

  const toggleTask = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Welcome back, {userName}!</h2>
        <p className="text-slate-500">You have {tasks.filter(t => !t.completed).length} pending tasks for today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
          <h3 className="text-lg font-semibold mb-2">Focus Level</h3>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-bold">84%</span>
            <span className="text-sm bg-blue-500 px-2 py-1 rounded">Excellent</span>
          </div>
          <div className="mt-4 h-2 bg-blue-400/30 rounded-full overflow-hidden">
            <div className="h-full bg-white w-[84%] rounded-full"></div>
          </div>
        </div>
        
        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
          <h3 className="text-lg font-semibold mb-2">Study Streak</h3>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-bold">12 Days</span>
            <span className="text-sm bg-indigo-500 px-2 py-1 rounded">Fire! 🔥</span>
          </div>
          <div className="mt-4 flex space-x-1">
             {[1,2,3,4,5,6,7].map(i => <div key={i} className="h-2 flex-1 bg-white/20 rounded-full overflow-hidden">
               <div className={`h-full bg-white ${i < 6 ? 'w-full' : 'w-0'}`}></div>
             </div>)}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg shadow-slate-200">
          <h3 className="text-lg font-semibold mb-2">Next Exam</h3>
          <p className="text-sm text-slate-400 mb-1">Calculus II</p>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold">In 3 Days</span>
            <span className="text-sm bg-slate-800 px-2 py-1 rounded">Urgent</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900">Active Tasks</h3>
            <button className="text-blue-600 font-semibold text-sm hover:underline">+ New Task</button>
          </div>
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group hover:bg-slate-100 transition-all">
                <div className="flex items-center space-x-4">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <div>
                    <h4 className={`font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>{task.title}</h4>
                    <span className="text-xs text-slate-500">{task.category} • Due {task.dueDate}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  task.priority === 'high' ? 'bg-red-100 text-red-600' : 
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                  'bg-green-100 text-green-600'
                }`}>
                  {task.priority}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Weekly Activity</h3>
          <div className="flex items-end justify-between h-48 px-2">
            {[45, 80, 60, 95, 30, 70, 50].map((h, i) => (
              <div key={i} className="flex flex-col items-center w-full space-y-2 group">
                <div 
                  className="w-8 bg-blue-100 group-hover:bg-blue-500 transition-all rounded-t-lg relative" 
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}m
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
