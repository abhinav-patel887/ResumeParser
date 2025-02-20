import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

import dotenv from "dotenv";

dotenv.config();

const model = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
});

// Define the prompt for LLM to extract key details
const prompt = `Extract the following details from this resume text:
  - Name:
  - Email:
  - Mobile Number:
  - Highest Qualification:
  - Skills:
  - Projects:
  - Certifications:
  - Experience (if any):
  Resume Text:
  {text}
  Return the data in a structured JSON format.`;

export async function processWithLLM(text) {
  try {
    const formattedPrompt = await prompt.format({ text });

    // Generate structured response from Gemini API
    const response = await model.invoke(formattedPrompt);

    console.log("✅ LLM Response:", response);
    return JSON.parse(response);
  } catch (error) {
    console.error("❌ Error processing LLM:", error);
    throw new Error("Failed to process text with LLM");
  }
}
