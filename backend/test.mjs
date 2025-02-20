import { extractTextFromPDF } from "./extractresume.mjs";
import { getResumeInfo } from "./geminiservice.mjs";

const pdfPath = "resume.pdf";

(async () => {
  try {
    console.log("\n🔍 Extracting text from PDF...");
    const resumeText = await extractTextFromPDF(pdfPath);

    if (!resumeText) {
      throw new Error("Text extraction failed.");
    }

    console.log("\n📄 Extracted Resume Text:\n", resumeText);

    console.log("\n🧠 Sending to Gemini AI...");
    const structuredData = await getResumeInfo(resumeText);

    if (!structuredData) {
      throw new Error("Resume processing failed.");
    }

    console.log("\n📌 Extracted Information:\n", structuredData);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
})();
