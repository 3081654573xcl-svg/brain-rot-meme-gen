
import React from 'react';
import { ImagePost } from '../types';

interface PostCardProps {
  post: ImagePost;
  onLike: (postId: string) => void;
  isLiked: boolean;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, isLiked, onClick }) => {
  return (
    <div className="group bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1">
      <div className="relative aspect-square cursor-pointer overflow-hidden" onClick={onClick}>
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="bg-black/60 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded text-cyan-400 uppercase tracking-tighter">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-4 flex justify-between items-center">
        <div className="flex-1 min-w-0" onClick={onClick}>
          <h3 className="font-meme text-2xl truncate text-white uppercase">{post.title}</h3>
          <p className="text-[10px] text-zinc-500 font-mono">{post.authorId}</p>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onLike(post.id); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all ${
            isLiked ? 'bg-pink-500/20 text-pink-500' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className="text-xl">{isLiked ? '❤️' : '🤍'}</span>
          <span className="font-bold text-sm">{post.likes}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
