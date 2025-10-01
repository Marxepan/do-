
import { GoogleGenAI, Type } from "@google/genai";
import { Book } from '../types';

// The API key is set in the environment variables. 
// Do not hard-code it here.
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const bookSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: 'The title of the book.'
    },
    author: {
      type: Type.STRING,
      description: 'The author of the book.'
    },
    description: {
      type: Type.STRING,
      description: 'A brief, compelling one-paragraph summary of the book.'
    },
    price: {
      type: Type.NUMBER,
      description: 'The price of the book in USD, e.g., 19.99.'
    },
    coverImageUrl: {
        type: Type.STRING,
        description: 'A placeholder image URL from picsum.photos with a unique seed, e.g. https://picsum.photos/seed/booktitle/400/600'
    }
  },
  required: ['title', 'author', 'description', 'price', 'coverImageUrl']
};

export async function generateBookData(): Promise<Omit<Book, 'id'>[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a list of 12 creative, fictional books across different genres like sci-fi, fantasy, mystery, and romance. Provide a unique title, author, a compelling one-paragraph description, a realistic price, and a unique placeholder image URL for each book from picsum.photos using a seed based on the book title (e.g., /seed/a-tale-of-stars/400/600).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: bookSchema,
        },
      },
    });

    const jsonString = response.text;
    const data = JSON.parse(jsonString);
    
    // Basic validation
    if (!Array.isArray(data)) {
        throw new Error("API did not return an array");
    }

    return data as Omit<Book, 'id'>[];

  } catch (error) {
    console.error("Error generating book data with Gemini:", error);
    throw new Error("Failed to fetch book data from the AI service.");
  }
}
