import { useState } from "react";
import { UploadCloud, FileText, CheckCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle File Selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setError(""); // Clear previous errors
    }
  };

  // Remove File
  const handleRemoveFile = () => {
    setFile(null);
    setError("");
  };

  // Upload & Process Resume
  const handleCheckResume = async () => {
    if (!file) {
      setError("Please upload a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setError("");

      // Send file to backend
      const uploadResponse = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || "Failed to upload resume.");
      }

      console.log("✅ Resume Uploaded:", uploadData);

      // Fetch Processed Resume Data
      const resumeResponse = await fetch("http://localhost:3000/resume-data");
      const resumeData = await resumeResponse.json();

      if (!resumeResponse.ok) {
        throw new Error(resumeData.error || "Failed to fetch resume details.");
      }

      console.log("✅ Processed Resume Data:", resumeData);

      // Navigate to checkresume with data
      navigate("/checkresume", { state: { resume: resumeData } });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-10 py-16 bg-gray-50">
      {/* Heading */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
          Optimize Your Resume with <span className="text-purple-600">AI-Powered Parsing</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Upload your resume to get <b>instant insights</b>, <b>suggestions</b>, and <b>ATS optimization tips</b>.
        </p>
      </div>

      {/* Upload Section */}
      <div className="flex flex-col items-center">
        {!file ? (
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 bg-white shadow-lg w-80 text-center">
            <label htmlFor="resumeUpload" className="flex flex-col items-center cursor-pointer">
              <UploadCloud className="h-12 w-12 text-purple-600 mb-3" />
              <p className="text-gray-600 font-medium">Drag & Drop or Click to Upload</p>
              <p className="text-sm text-gray-400 mt-1">(Only PDF files allowed)</p>
              <input
                type="file"
                id="resumeUpload"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-purple-500 rounded-lg p-5 bg-white shadow-lg w-80 text-center">
            <FileText className="h-14 w-14 text-purple-600 mb-2" />
            <p className="text-gray-700 font-medium">{file.name}</p>
            <button
              onClick={handleRemoveFile}
              className="mt-2 flex items-center gap-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" /> Remove
            </button>
          </div>
        )}

        {/* Upload & Check Resume Buttons */}
        {file && (
          <div className="flex flex-col items-center gap-3 mt-4">
            <button
              onClick={handleCheckResume}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition shadow-md"
              disabled={loading}
            >
              {loading ? "Processing..." : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Check Resume
                </>
              )}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </section>
  );
};

export default Hero;
