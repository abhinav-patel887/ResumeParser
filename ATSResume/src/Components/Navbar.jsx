import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import logo from "../assets/logo.png"; 

const Navbar = () => {
  return (
    <nav className="flex flex-row items-center justify-between px-8 py-4 bg-white shadow-md">
      {/* Left Side: Logo & Name */}
      <Link to="/" className="flex flex-row items-center space-x-3">
        <img src={logo} alt="DeepKlarity" className="h-10 w-10 object-contain" />
        <h1 className="text-3xl font-bold">
          Deep<span className="text-purple-600">Klarity</span>
        </h1>
      </Link>

      {/* Right Side: Past Uploads Button */}
      <Link to="/past-uploads" className="flex items-center space-x-2 px-5 py-2 border border-gray-300 rounded-lg hover:bg-purple-200 transition duration-200">
        <Menu className="h-6 w-6" />
        <span className="text-lg font-medium">Past Uploads</span>
      </Link>
    </nav>
  );
};

export default Navbar;
