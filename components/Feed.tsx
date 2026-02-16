
import React, { useState } from 'react';
import { ImagePost, FeedTab } from '../types';
import PostCard from './PostCard';

interface FeedProps {
  posts: ImagePost[];
  onLike: (postId: string) => void;
  userLikes: Set<string>;
  onPostClick: (post: ImagePost) => void;
}

const Feed: React.FC<FeedProps> = ({ posts, onLike, userLikes, onPostClick }) => {
  const [activeTab, setActiveTab] = useState<FeedTab>(FeedTab.LATEST);

  const sortedPosts = [...posts].sort((a, b) => {
    if (activeTab === FeedTab.HOTTEST) return b.likes - a.likes;
    if (activeTab === FeedTab.RANDOM) return Math.random() - 0.5;
    return b.createdAt - a.createdAt;
  });

  return (
    <div>
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {Object.values(FeedTab).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-bold text-sm uppercase transition-all ${
              activeTab === tab 
                ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]' 
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedPosts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLike={onLike} 
            isLiked={userLikes.has(post.id)}
            onClick={() => onPostClick(post)}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
