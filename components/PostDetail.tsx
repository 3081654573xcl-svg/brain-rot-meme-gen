
import React from 'react';
import { ImagePost } from '../types';

interface PostDetailProps {
  post: ImagePost;
  onLike: (postId: string) => void;
  userLikes: Set<string>;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onLike, userLikes, onBack }) => {
  const isLiked = userLikes.has(post.id);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
        <span className="group-hover:-translate-x-1 transition-transform">⬅️</span>
        <span className="font-bold uppercase tracking-widest text-xs">Back to Feed</span>
      </button>

      <div className="bg-zinc-900 rounded-[3rem] p-4 border border-white/10 shadow-2xl">
        <img 
          src={post.imageUrl} 
          className="w-full aspect-square object-cover rounded-[2.5rem] shadow-[0_0_50px_rgba(255,255,255,0.05)]" 
        />
      </div>

      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="font-meme text-6xl text-white mb-2 leading-none uppercase">{post.title}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-zinc-400 font-bold">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => onLike(post.id)}
          className={`flex flex-col items-center gap-1 p-6 rounded-3xl transition-all ${
            isLiked ? 'bg-pink-500/20 text-pink-500 scale-110' : 'bg-white text-black hover:bg-pink-100'
          }`}
        >
          <span className="text-4xl">{isLiked ? '❤️' : '🤍'}</span>
          <span className="font-meme text-2xl">{post.likes}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5">
          <h3 className="font-bold uppercase text-xs text-zinc-500 mb-4 tracking-tighter">Source Components</h3>
          <div className="flex flex-wrap gap-3">
            {post.sourceImages.map((src, i) => (
              <img key={i} src={src} className="w-20 h-20 rounded-2xl object-cover border border-white/10" />
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5">
          <h3 className="font-bold uppercase text-xs text-zinc-500 mb-4 tracking-tighter">Brain Rot Logic</h3>
          <p className="text-sm font-mono text-cyan-400 leading-relaxed">
            {post.prompt}
          </p>
        </div>
      </div>

      <div className="text-center pt-8 opacity-20">
        <div className="text-[10px] font-mono mb-1">METADATA ID: {post.id}</div>
        <div className="text-[10px] font-mono">CREATED: {new Date(post.createdAt).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default PostDetail;
