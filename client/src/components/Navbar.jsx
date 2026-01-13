// components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { User, LogOut, Briefcase, ArrowRight } from "lucide-react";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  

  return (
    <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-blue-100 px-6 lg:px-8 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent hover:from-blue-800 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 group "
        >
          Gig<span className="text-blue-600 group-hover:scale-110 transition-transform">Flow</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {user ? (
            <>

              {/* Post Gig Button (Client Only) */}
              {user.role === "client" && (
                <Link
                  to="/create-gig"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <Briefcase className="w-4 h-4" />
                  Post Gig
                </Link>
              )}

              {/* Profile Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50 transition-all duration-200 group-hover:shadow-md">
                  <div className="w-9 h-9 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
                    <User className="w-5 h-5 text-blue-700" />
                  </div>
                  <span className="font-semibold text-gray-700 hidden lg:inline">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                  <Link
                    to={`/user/${user._id}`}
                    className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl font-medium transition-all duration-200"
                  >
                    <User className="w-5 h-5 flex-shrink-0" />
                    View Profile
                  </Link>
                  
                  {user.role === "client" && (
                    <Link
                      to="/create-gig"
                      className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl font-medium transition-all duration-200"
                    >
                      <Briefcase className="w-5 h-5 flex-shrink-0" />
                      Post New Gig
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl font-medium transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Auth Links */}
              <Link
                to="/login"
                className={`px-5 py-2.5 font-semibold rounded-xl transition-all duration-200 ${
                  location.pathname === "/login"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-6 py-2.5 font-semibold rounded-2xl shadow-lg transition-all duration-200 ${
                  location.pathname === "/register"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                }`}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-xl hover:bg-blue-50 transition-colors">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
