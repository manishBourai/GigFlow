// client/src/pages/GigDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  User,
  Clock,
  MessageCircle,
  Send,
  Briefcase,
  CheckCircle
} from "lucide-react";
import api from "../api/axios";

export default function GigDetail() {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGig() {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/gigs/${id}`);
        setGig(res.data);
      } catch (err) {
        console.error("Error fetching gig:", err);
        setError("Failed to load gig details");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchGig();
  }, [id]);

  // Enhanced Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            <span className="ml-4 text-xl font-medium text-gray-600">Loading gig details...</span>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced Error State
  if (error || !gig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-red-200 rounded-3xl mx-auto mb-8 flex items-center justify-center">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{error || "Gig not found"}</h2>
            <Link 
              to="/gigs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-white px-8 py-3 rounded-2xl font-semibold hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Gigs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-12">
          <Link 
            to="/gigs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition-colors text-sm p-3 bg-white/70 backdrop-blur-xl rounded-2xl hover:bg-white shadow-sm border border-white/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all gigs
          </Link>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Header */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/50">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-primary bg-clip-text text-transparent leading-tight mb-4">
                    {gig.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-xl">
                      <User className="w-4 h-4 text-primary" />
                      <span>{gig.postedBy?.name || "Anonymous Client"}</span>
                    </div>
                    {gig.location && (
                      <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span>{gig.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Budget Highlight */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-8 border border-emerald-100 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <DollarSign className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Budget</p>
                    <p className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                      ₹{gig.budget.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/50">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-primary" />
                Project Description
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="whitespace-pre-wrap text-lg">{gig.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar - Actions */}
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Apply Button */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-8 shadow-xl border border-emerald-100 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                Ready to Apply?
              </h3>
              <Link
                to={`/gig/apply/${gig._id}`}
                className="w-full bg-gradient-to-r from-primary via-primary/90 to-emerald-600 hover:from-primary/90 hover:to-emerald-500 text-white py-6 px-8 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 flex items-center justify-center gap-3 group"
              >
                <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                Apply Now
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to={`/user/${gig.postedBy?._id}`}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 text-gray-700 hover:text-primary font-semibold transition-all duration-200 group"
                >
                  <User className="w-5 h-5 flex-shrink-0" />
                  View Client Profile
                </Link>
               
              </div>
            </div>

            {/* Client Info */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-xl border border-indigo-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Client Info</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  <User className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{gig.postedBy?.name}</h4>
                  <p className="text-sm text-gray-600 bg-indigo-100 px-3 py-1 rounded-full inline-block mt-1">
                    Verified Client
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
