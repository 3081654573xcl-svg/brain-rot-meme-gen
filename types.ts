
export interface ImagePost {
  id: string;
  imageUrl: string;
  sourceImages: string[]; // base64 or urls
  title: string;
  likes: number;
  createdAt: number;
  authorId: string;
  tags: string[];
  prompt: string;
}

export enum FeedTab {
  LATEST = 'latest',
  HOTTEST = 'hottest',
  RANDOM = 'random'
}

export enum View {
  FEED = 'feed',
  GENERATE = 'generate',
  LEADERBOARD = 'leaderboard',
  DETAIL = 'detail'
}

export interface VoteRecord {
  postId: string;
  timestamp: number;
}
