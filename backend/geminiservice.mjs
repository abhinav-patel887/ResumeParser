import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("❌ Missing GOOGLE_API_KEY in environment variables.");
}

export async function getResumeInfo(resumeText) {
  try {
    if (!resumeText.trim()) {
      throw new Error("Resume text is empty, unable to process.");
    }

    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-1.5-flash",
      apiKey: API_KEY,
      maxOutputTokens: 2048,
    });

    const prompt = `
      Extract the following details from this resume text:
      - Name
      - Email
      - Mobile Number
      - Qualification
      - Skills
      - Projects
      - Certifications
      - Experience

      If any detail is missing, return "none".

      **Strictly output in raw JSON format without using triple backticks or any extra explanation.**

      Example Output:
      {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "mobile": "1234567890",
        "qualification": "B.Tech in Computer Science",
        "skills": ["React", "Node.js", "MongoDB"],
        "projects": ["Project 1", "Project 2"],
        "certifications": ["Certification 1", "Certification 2"],
        "experience": "2 years as a Software Engineer"
      }

      Resume Text:
      """${resumeText}"""
    `;

    const response = await model.invoke(prompt);

    if (!response) {
      throw new Error("Gemini AI did not return a valid response.");
    }

    let rawText = response.content;

    if (!rawText) {
      throw new Error("Gemini AI response is empty.");
    }

    // ✅ FIX: Remove any Markdown formatting (triple backticks)
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

    // ✅ FIX: Ensure valid JSON parsing
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (jsonError) {
      console.error("❌ Error parsing Gemini response:", jsonError.message);
      console.error("🔹 Raw Response from Gemini AI:", rawText);
      throw new Error("Invalid JSON response from Gemini AI.");
    }

    return parsedData;
  } catch (error) {
    console.error("❌ Error with Gemini AI:", error.message);
    return null;
  }
}
