import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors"; // Enable CORS for frontend access
import { extractTextFromPDF } from "./extractresume.mjs";
import { getResumeInfo } from "./geminiservice.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Enable JSON parsing

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

let resumeData = null; // Store extracted data globally

// Upload and Process Resume
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.resolve(req.file.path);
    console.log(`📂 Processing uploaded file: ${filePath}`);

    // Extract text from PDF
    const resumeText = await extractTextFromPDF(filePath);
    if (!resumeText) throw new Error("Failed to extract text from PDF.");

    // Process resume text with Gemini AI
    resumeData = await getResumeInfo(resumeText);
    if (!resumeData) throw new Error("Failed to process resume.");

    // Cleanup: Delete the uploaded file after processing
    fs.unlinkSync(filePath);

    res.json({ success: true, parsedData: resumeData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// New Route: Send Processed Resume Data to Frontend
app.get("/resume-data", (req, res) => {
  if (!resumeData) {
    return res.status(404).json({ error: "No resume data found" });
  }
  res.json(resumeData);
});




// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
