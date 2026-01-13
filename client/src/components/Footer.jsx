// components/Footer.jsx
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Github, 
  Mail, 
  MapPin, 
  Phone 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white/90 backdrop-blur-xl shadow-lg border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/gigs" className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-4 flex items-center gap-2">
              Gig<span className="text-blue-600">Flow</span>
            </Link>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
              Connecting freelancers and clients with seamless gig management. 
              Post projects, find talent, and get work done efficiently.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
            
              <a href="https://www.linkedin.com/in/manish-bourai" target="_blank" className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/manishBourai" target="_blank" className="w-12 h-12 bg-gray-800 text-white rounded-2xl flex items-center justify-center hover:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                  All Gigs
                </Link>
              </li>
              <li>
                <Link to="/create-gig" className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                  Post Gig
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Contact Info</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">hello@gigflow.com</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              © 2026 GigFlow. All rights reserved. Built with ❤️ in India.
            </p>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-blue-600 transition-colors font-medium">Privacy</Link>
              <Link to="/" className="hover:text-blue-600 transition-colors font-medium">Terms</Link>
              <Link to="/" className="hover:text-blue-600 transition-colors font-medium">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
