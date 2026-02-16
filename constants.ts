
export const BRAINROT_PROMPT_TEMPLATE = (subjects: string[]) => 
  `a cursed brain rot creature combining ${subjects.join(' and ')}, absurd proportions, low quality, distorted anatomy, meme style, chaotic composition, weird facial expression, surreal humor, ugly aesthetic, internet brainrot, badly photoshopped look, pixelated edges, weird lighting, artifacting`;

export const LOADING_MESSAGES = [
  "Inhaling brain rot particles...",
  "Synthesizing absurdities...",
  "Lowering image quality to meme standards...",
  "Distorting reality...",
  "Consulting the council of cats...",
  "Generating weird facial expressions...",
  "Adding badly photoshopped artifacts...",
  "Hyper-saturating the pixels...",
  "Feeding the AI some questionable internet memes...",
  "Almost there, don't blink or it'll disappear..."
];

export const INITIAL_POSTS = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/seed/meme1/600/600',
    sourceImages: ['https://picsum.photos/seed/s1/200/200', 'https://picsum.photos/seed/s2/200/200'],
    title: 'Giga-Duck-Banana-Man',
    likes: 420,
    createdAt: Date.now() - 3600000,
    authorId: 'anon-123',
    tags: ['cursed', 'duck', 'banana'],
    prompt: 'duck + banana + giga chad'
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/seed/meme2/600/600',
    sourceImages: ['https://picsum.photos/seed/s3/200/200', 'https://picsum.photos/seed/s4/200/200'],
    title: 'The Glitched Sofa Cat',
    likes: 69,
    createdAt: Date.now() - 7200000,
    authorId: 'anon-456',
    tags: ['weird', 'cat', 'furniture'],
    prompt: 'cat + sofa fusion glitch'
  }
];
