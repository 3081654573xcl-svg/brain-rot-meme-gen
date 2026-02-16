
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data:image/png;base64, prefix for Gemini
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const generateAnonId = () => {
  return 'anon-' + Math.random().toString(36).substr(2, 9);
};

export const getStoredPosts = () => {
  const stored = localStorage.getItem('brainrot_posts');
  if (stored) return JSON.parse(stored);
  return [];
};

export const savePost = (post: any) => {
  const posts = getStoredPosts();
  localStorage.setItem('brainrot_posts', JSON.stringify([post, ...posts]));
};
