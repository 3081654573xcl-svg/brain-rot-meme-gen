
import React from 'react';
import { ImagePost } from '../types';

interface LeaderboardProps {
  posts: ImagePost[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ posts }) => {
  const topPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-6xl">🏆</span>
        <h2 className="font-meme text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">THE ROT COUNCIL</h2>
      </div>

      <div className="bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden">
        {topPosts.map((post, index) => (
          <div 
            key={post.id} 
            className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-none"
          >
            <div className={`w-12 h-12 flex items-center justify-center font-meme text-3xl rounded-full ${
              index === 0 ? 'bg-yellow-400 text-black' : 
              index === 1 ? 'bg-zinc-300 text-black' :
              index === 2 ? 'bg-orange-500 text-black' : 'text-zinc-600'
            }`}>
              {index + 1}
            </div>
            
            <img src={post.imageUrl} className="w-16 h-16 rounded-xl object-cover" />
            
            <div className="flex-1">
              <h4 className="font-bold text-white uppercase tracking-wider">{post.title}</h4>
              <p className="text-xs text-zinc-500">by {post.authorId}</p>
            </div>
            
            <div className="text-right">
              <div className="font-meme text-2xl text-pink-500">{post.likes}</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase">Likes</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
