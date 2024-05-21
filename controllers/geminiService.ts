// geminiService.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.API_KEY!);

// Model initialization
const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });

export async function generateGeminiRequest(prompt: string): Promise<string> {
  // Generate the request data for the Gemini API
  return prompt;
}

export async function geminiService(request: string): Promise<string> {
  try {
    // Make the request to the Gemini API
    const chat = model.startChat({
      //history: [], // Assuming no history initially
      generationConfig: {
        maxOutputTokens: 20000,
      },
    });
    //console.log("hello here is the format: "+request)
    const result = await chat.sendMessage(request);
    const response = await result.response;
    const responseText = response.text();

    return responseText;
  } catch (error) {
    console.error(error);
    throw new Error("Error processing request to Gemini API");
  }
}
