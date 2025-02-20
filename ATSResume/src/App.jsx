import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PastUploads from "./Pages/PastUploads";
import './index.css'
import CheckResume from "./Pages/Checkresume";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pastuploads" element={<PastUploads />} />
      <Route path="/checkresume" element={<CheckResume />} />
    </Routes>
  );
}

export default App;
