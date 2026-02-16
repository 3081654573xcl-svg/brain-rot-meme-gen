
import React, { useState, useEffect } from 'react';
import { View, ImagePost, FeedTab } from './types';
import { INITIAL_POSTS } from './constants';
import { getStoredPosts, generateAnonId } from './utils';
import Navigation from './components/Navigation';
import Feed from './components/Feed';
import Leaderboard from './components/Leaderboard';
import BrainRotGenerator from './components/BrainRotGenerator';
import PostDetail from './components/PostDetail';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.FEED);
  const [posts, setPosts] = useState<ImagePost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ImagePost | null>(null);
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = getStoredPosts();
    const allPosts = [...stored, ...INITIAL_POSTS];
    setPosts(allPosts);
    
    const liked = localStorage.getItem('user_likes');
    if (liked) {
      setUserLikes(new Set(JSON.parse(liked)));
    }
  }, []);

  const handleLike = (postId: string) => {
    if (userLikes.has(postId)) return;

    const newPosts = posts.map(p => 
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    );
    setPosts(newPosts);
    
    const newLikes = new Set(userLikes).add(postId);
    setUserLikes(newLikes);
    localStorage.setItem('user_likes', JSON.stringify(Array.from(newLikes)));

    // Persist to local storage if it's a "stored" post
    const stored = getStoredPosts();
    const updatedStored = stored.map((p: any) => 
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    );
    localStorage.setItem('brainrot_posts', JSON.stringify(updatedStored));
  };

  const handlePostCreated = (newPost: ImagePost) => {
    setPosts([newPost, ...posts]);
    setCurrentView(View.FEED);
  };

  const openDetail = (post: ImagePost) => {
    setSelectedPost(post);
    setCurrentView(View.DETAIL);
  };

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
        <div 
          className="font-meme text-4xl text-transparent bg-clip-text brainrot-gradient cursor-pointer"
          onClick={() => setCurrentView(View.FEED)}
        >
          BRAIN ROT GEN
        </div>
        <button 
          onClick={() => setCurrentView(View.GENERATE)}
          className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-cyan-400 hover:scale-105 transition-all"
        >
          + GENERATE
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {currentView === View.FEED && (
          <Feed 
            posts={posts} 
            onLike={handleLike} 
            userLikes={userLikes} 
            onPostClick={openDetail} 
          />
        )}
        {currentView === View.GENERATE && (
          <BrainRotGenerator onPostCreated={handlePostCreated} />
        )}
        {currentView === View.LEADERBOARD && (
          <Leaderboard posts={posts} />
        )}
        {currentView === View.DETAIL && selectedPost && (
          <PostDetail 
            post={selectedPost} 
            onLike={handleLike} 
            userLikes={userLikes}
            onBack={() => setCurrentView(View.FEED)}
          />
        )}
      </main>

      <Navigation 
        activeView={currentView} 
        onViewChange={(v) => setCurrentView(v)} 
      />
    </div>
  );
};

export default App;
