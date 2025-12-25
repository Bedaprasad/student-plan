
import { GoogleGenAI, Type } from "@google/genai";
import { Flashcard, NoteSummary, StudyPlan } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const generateFlashcards = async (topic: string, count: number = 5): Promise<Flashcard[]> => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate ${count} educational flashcards about ${topic}. Return as JSON array of objects with front and back properties.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            front: { type: Type.STRING },
            back: { type: Type.STRING },
          },
          required: ["front", "back"],
        },
      },
    },
  });

  const cards = JSON.parse(response.text || "[]");
  return cards.map((c: any, i: number) => ({ ...c, id: `fc-${Date.now()}-${i}` }));
};

export const summarizeNotes = async (content: string): Promise<NoteSummary> => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Summarize the following notes. Extract key concepts and action items: \n\n${content}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          keyConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
          actionItems: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["summary", "keyConcepts", "actionItems"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
};

export const generateStudyPlan = async (examTopic: string, daysRemaining: number): Promise<StudyPlan> => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Create a comprehensive study plan for "${examTopic}" with ${daysRemaining} days remaining. Focus on intensity and clarity.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          schedule: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                activity: { type: Type.STRING },
                topic: { type: Type.STRING },
                duration: { type: Type.STRING },
              },
              required: ["time", "activity", "topic", "duration"],
            },
          },
        },
        required: ["title", "schedule"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
};

export const academicSearch = async (query: string) => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Explain the following academic concept with citations and deep insight: ${query}`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  return {
    answer: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [],
  };
};
