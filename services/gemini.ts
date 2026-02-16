
import { GoogleGenAI, Type } from "@google/genai";
import { BRAINROT_PROMPT_TEMPLATE } from "../constants";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeImages = async (base64Images: string[]): Promise<string[]> => {
  const ai = getAI();
  
  const parts = base64Images.map(data => ({
    inlineData: {
      data,
      mimeType: "image/jpeg"
    }
  }));

  parts.push({
    text: "Identify the main subjects in these images. List them as simple nouns separated by commas. Example: cat, banana, toaster. Keep it to 1-2 words per image."
  } as any);

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: parts as any }
  });

  const text = response.text || "";
  return text.split(',').map(s => s.trim()).filter(s => s.length > 0);
};

export const generateBrainRotImage = async (subjects: string[]): Promise<string> => {
  const ai = getAI();
  const prompt = BRAINROT_PROMPT_TEMPLATE(subjects);
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  if (imagePart?.inlineData?.data) {
    return `data:image/png;base64,${imagePart.inlineData.data}`;
  }
  throw new Error("Failed to generate image");
};

export const generateTitleAndTags = async (subjects: string[]): Promise<{ title: string, tags: string[] }> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a funny, weird, brain-rot style title and 3-5 tags for a creature that is a fusion of: ${subjects.join(', ')}. Return as JSON with keys "title" and "tags".`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["title", "tags"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch {
    return { title: subjects.join('-') + ' Rot', tags: ['brainrot', 'cursed'] };
  }
};
