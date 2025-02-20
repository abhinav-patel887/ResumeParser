import { useLocation, useNavigate } from "react-router-dom";

const CheckResume = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("🔹 Received location state:", location.state); // Debugging log

  const resumeData = location.state?.resume;
  console.log("🔹 Extracted resumeData:", resumeData); // Debugging log

  if (!resumeData) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-bold text-purple-600 mb-4 text-center">
          No Resume Data Found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-l from-purple-300/40 to-white">
      {/* Top Left Heading */}
      <div className="absolute top-5 left-3 text-3xl font-bold">
        <span className="text-black">Resume</span> <span className="text-purple-600">Summary</span>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-5xl mt-3.5">
        {/* Left Slide: Basic Info, Projects, Certifications */}
        <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg m-4">
          <h2 className="text-2xl font-bold text-purple-600 mb-4 text-center">
            Hey, {resumeData.name.split(" ")[0]}!
          </h2>
          <p className="text-black"><strong className="text-purple-600">Name:</strong> {resumeData.name}</p>
          <p className="text-black"><strong className="text-purple-600">Email:</strong> {resumeData.email}</p>
          <p className="text-black"><strong className="text-purple-600">Mobile:</strong> {resumeData.mobile}</p>
          <p className="text-black"><strong className="text-purple-600">Qualification:</strong> {resumeData.qualification}</p>

          <h3 className="text-xl font-bold text-purple-600 mt-4">Projects</h3>
          <ul className="list-disc pl-5 text-black">
            {resumeData.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>

          {/* Display Certifications */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <>
              <h3 className="text-xl font-bold text-purple-600 mt-4">Certifications</h3>
              <ul className="list-disc pl-5 text-black">
                {resumeData.certifications.map((certification, index) => (
                  <li key={index}>{certification}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Right Slide: Skills Only */}
        <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg m-4">
          <h3 className="text-xl font-bold text-purple-600">Skills</h3>
          <ul className="list-disc pl-5 text-black">
            {resumeData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckResume;
