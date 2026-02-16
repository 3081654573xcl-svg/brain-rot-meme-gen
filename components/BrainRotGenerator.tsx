
import React, { useState, useRef } from 'react';
import { analyzeImages, generateBrainRotImage, generateTitleAndTags } from '../services/gemini';
import { fileToBase64, generateAnonId, savePost } from '../utils';
import { ImagePost } from '../types';
import { LOADING_MESSAGES } from '../constants';

interface BrainRotGeneratorProps {
  onPostCreated: (post: ImagePost) => void;
}

const BrainRotGenerator: React.FC<BrainRotGeneratorProps> = ({ onPostCreated }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, 5);
      setFiles(newFiles);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  };

  const handleGenerate = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 images to fuse!");
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    // Cycle loading messages
    const msgInterval = setInterval(() => {
      setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    }, 2500);

    try {
      const base64s = await Promise.all(files.map(fileToBase64));
      
      // Step 1: Analyze subjects
      const subjects = await analyzeImages(base64s);
      
      // Step 2: Generate Brain Rot Image
      const imageUrl = await generateBrainRotImage(subjects);
      
      // Step 3: Get title and tags
      const { title, tags } = await generateTitleAndTags(subjects);

      const newPost: ImagePost = {
        id: Math.random().toString(36).substr(2, 9),
        imageUrl,
        sourceImages: previews, // Using URL.createObjectURL previews for simplicity in MVP
        title,
        likes: 0,
        createdAt: Date.now(),
        authorId: generateAnonId(),
        tags,
        prompt: subjects.join(' + ')
      };

      savePost(newPost);
      onPostCreated(newPost);
    } catch (err: any) {
      setError(err.message || "Failed to generate brain rot. Try again.");
    } finally {
      clearInterval(msgInterval);
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 rounded-3xl p-8 border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none text-8xl">🧬</div>
      
      <h2 className="font-meme text-5xl mb-6 text-yellow-400">FUSE REALITY</h2>
      
      <div className="space-y-6">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-4 border-dashed border-white/10 rounded-2xl p-12 text-center cursor-pointer hover:border-cyan-400 transition-colors bg-black/20"
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple 
            accept="image/*"
            className="hidden" 
          />
          <span className="text-4xl block mb-2">📸</span>
          <p className="text-zinc-400 font-bold uppercase tracking-wider">Upload 2-5 Cursed Images</p>
        </div>

        {previews.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {previews.map((src, i) => (
              <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/20">
                <img src={src} alt="preview" className="w-full h-full object-cover" />
              </div>
            ))}
            <button 
              onClick={() => {setFiles([]); setPreviews([]);}}
              className="text-red-400 text-xs font-bold uppercase underline"
            >
              Clear All
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-xl text-sm font-bold border border-red-500/50">
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={isGenerating || files.length < 2}
          className={`w-full py-6 rounded-2xl font-meme text-3xl tracking-widest transition-all ${
            isGenerating 
              ? 'bg-zinc-800 cursor-not-allowed text-zinc-600' 
              : 'bg-white text-black hover:bg-cyan-400 hover:scale-[1.02] active:scale-95'
          }`}
        >
          {isGenerating ? 'BREWING ROT...' : 'GENERATE BRAIN ROT'}
        </button>
      </div>

      {isGenerating && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex flex-col items-center justify-center p-8 text-center">
          <div className="w-32 h-32 mb-8 animate-spin rounded-full border-8 border-cyan-400 border-t-transparent shadow-[0_0_50px_rgba(0,255,255,0.5)]"></div>
          <p className="font-meme text-4xl text-white mb-4">{loadingMsg}</p>
          <p className="text-zinc-500 text-sm animate-pulse">Our AI is losing its mind just for you...</p>
        </div>
      )}
    </div>
  );
};

export default BrainRotGenerator;
