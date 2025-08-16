import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { SearchResult } from '../types';
import { 
    API_KEY_ERROR_MESSAGE, 
    IDENTIFY_AND_FIND_ITEMS_PROMPT,
    STYLE_RESPONSE_SCHEMA,
    HYPERREALISTIC_SINGLE_OUTFIT_PROMPT,
    HYPERREALISTIC_MOOD_BOARD_PROMPT
} from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error(API_KEY_ERROR_MESSAGE);
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const checkApiKey = () => {
  if (!API_KEY) {
    throw new Error(API_KEY_ERROR_MESSAGE);
  }
};

export const generateMonetizationStrategy = async (prompt: string): Promise<{ text: string, searchResults: SearchResult[] }> => {
  checkApiKey();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
       tools: [{googleSearch: {}}],
     },
  });
  
  const searchResults = response.candidates?.[0]?.groundingMetadata?.groundingChunks as SearchResult[] || [];

  return {
    text: response.text,
    searchResults: searchResults.filter(result => result.web?.uri)
  };
};

export const generateEducationalContent = async (prompt: string): Promise<{ text: string, searchResults: SearchResult[] }> => {
  checkApiKey();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
     config: {
       tools: [{googleSearch: {}}],
     },
  });
  const searchResults = response.candidates?.[0]?.groundingMetadata?.groundingChunks as SearchResult[] || [];

  return {
    text: response.text,
    searchResults: searchResults.filter(result => result.web?.uri)
  };
};

export const generateStyleOut = async (prompt: string): Promise<{ text: string }> => {
    checkApiKey();
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: STYLE_RESPONSE_SCHEMA,
        },
    });
    return { text: response.text };
};

export const findShoppingLinksForImage = async (prompt: string, options: { imageBase64: string }): Promise<string> => {
    checkApiKey();

    const imagePart = {
        inlineData: {
            mimeType: 'image/jpeg',
            data: options.imageBase64,
        },
    };

    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts: [imagePart, textPart] },
        config: {
            responseMimeType: "application/json",
            responseSchema: STYLE_RESPONSE_SCHEMA,
        },
    });

    return response.text;
};

export const generateMoodBoard = async (prompt: string): Promise<string> => {
  checkApiKey();
  const response = await ai.models.generateImages({
    model: 'imagen-3.0-generate-002',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '16:9',
    },
  });

  const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
  return base64ImageBytes; // Return raw base64 data
};

export const generateVisualWithShoppingLinks = async (userRequest: string, options: { domain: string }): Promise<{ text: string, imageUrl: string }> => {
    checkApiKey();

    const imagePrompt = userRequest.toLowerCase().includes('model') 
        ? HYPERREALISTIC_SINGLE_OUTFIT_PROMPT(userRequest)
        : HYPERREALISTIC_MOOD_BOARD_PROMPT;
    
    const imageBase64 = await generateMoodBoard(imagePrompt);

    const linkPrompt = IDENTIFY_AND_FIND_ITEMS_PROMPT(options.domain);
    const shoppingText = await findShoppingLinksForImage(linkPrompt, { imageBase64 });
    
    return {
        text: shoppingText,
        imageUrl: imageBase64,
    };
};