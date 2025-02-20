import fs from "fs";
import pdfjs from "pdfjs-dist/legacy/build/pdf.js";

export async function extractTextFromPDF(pdfPath) {
  try {
    if (!fs.existsSync(pdfPath)) {
      throw new Error("File not found: " + pdfPath);
    }

    // Read PDF file as Uint8Array
    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = new Uint8Array(dataBuffer); // ✅ Convert Buffer to Uint8Array

    // Load the PDF
    const pdf = await pdfjs.getDocument({ data: pdfData }).promise;

    let extractedText = "";

    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      extractedText += textContent.items.map(item => item.str).join(" ") + "\n";
    }

    if (!extractedText.trim()) {
      throw new Error("No readable text found in the PDF.");
    }

    return extractedText;
  } catch (error) {
    console.error("❌ Error reading PDF:", error.message);
    return null;
  }
}
