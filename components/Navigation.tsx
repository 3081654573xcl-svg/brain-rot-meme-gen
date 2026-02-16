
import React from 'react';
import { View } from '../types';

interface NavigationProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange }) => {
  const tabs = [
    { id: View.FEED, label: 'FEED', icon: '🔥' },
    { id: View.GENERATE, label: 'CREATE', icon: '🪄' },
    { id: View.LEADERBOARD, label: 'TOP', icon: '🏆' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 border-t border-white/5 py-3 px-6 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeView === tab.id ? 'text-cyan-400 scale-110' : 'text-zinc-500 hover:text-white'
            }`}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span className="text-xs font-bold">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
