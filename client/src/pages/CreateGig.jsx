// pages/CreateGig.jsx
import { useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  DollarSign, 
  Send, 
  X, 
  ArrowLeft,
  Briefcase 
} from "lucide-react";

export default function CreateGig() {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  const [gig, setGig] = useState({ title: "", description: "", budget: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setGig({ ...gig, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Please login to create a gig");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      await api.post("/gigs", { ...gig, postedBy: user._id });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white border border-white/50"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
              Post New Gig
            </h1>
            <p className="text-gray-600 mt-1 font-medium">
              Create a new freelance opportunity
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Title Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-xl font-bold text-gray-900">
                <FileText className="w-6 h-6 text-primary" />
                Gig Title
              </label>
              <input
                name="title"
                placeholder="Enter a compelling gig title..."
                className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 bg-white/50 hover:border-primary/70"
                value={gig.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-xl font-bold text-gray-900">
                <Briefcase className="w-6 h-6 text-primary" />
                Description
              </label>
              <textarea
                name="description"
                rows={6}
                placeholder="Describe the project in detail, required skills, deliverables, timeline..."
                className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl resize-vertical focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 bg-white/50 hover:border-primary/70 font-light"
                value={gig.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Budget Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-xl font-bold text-gray-900">
                <DollarSign className="w-6 h-6 text-emerald-600" />
                Budget (₹)
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</div>
                <input
                  name="budget"
                  type="number"
                  placeholder="5000"
                  className="w-full pl-12 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all duration-200 bg-white/50 hover:border-emerald-400 font-mono tracking-wider"
                  value={gig.budget}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !user}
              className="w-full bg-gradient-to-r from-primary via-primary/90 to-emerald-600 hover:from-primary/90 hover:to-emerald-500 disabled:from-gray-400 disabled:to-gray-300 text-white py-6 px-8 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Creating Gig...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                  Post Gig Now
                </>
              )}
            </button>
          </form>

          {/* Preview Info */}
          <div className="mt-12 pt-10 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              Preview
            </h3>
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
              <div className="font-bold text-xl line-clamp-2 mb-2">{gig.title || "Gig Title"}</div>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">{gig.description || "Description will appear here..."}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-emerald-600">
                  ₹{gig.budget ? parseInt(gig.budget).toLocaleString() : "0"}
                </span>
                <span className="text-sm text-gray-500 font-medium">
                  Posted by {user?.name || "You"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
