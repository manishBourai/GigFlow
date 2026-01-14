import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import {
  ArrowLeft,
  User,
  Briefcase,
  Mail,
  Award,
  MapPin,
  DollarSign,
} from "lucide-react";

export default function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedGigs, setAppliedGigs] = useState([]);


useEffect(() => {
  (async function fetchUser() {
    try {
      setLoading(true);
      const res = await api.get(`/users/${id}`);
      setUser(res.data.user);
      setGigs(res.data.postedGigs || []);        // posted gigs
      setAppliedGigs(res.data.appliedGigs || []); // applied gigs
    } catch (err) {
      setError("Failed to load user profile");
    } finally {
      setLoading(false);
    }
  })();
}, [id]);


  

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center py-20">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          <span className="text-xl font-medium text-gray-600">
            Loading profile...
          </span>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-24 h-24 bg-red-100 rounded-3xl mx-auto mb-8 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {error || "User not found"}
        </h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Gigs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Navigation */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-700 font-medium hover:text-blue-800 transition-colors p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Gigs
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 sticky top-24">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-8 text-center">
                <div className="relative">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={`${user.name}'s avatar`}
                      className="w-28 h-28 rounded-3xl object-cover shadow-2xl border-4 border-white ring-4 ring-blue-100"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-gradient-to-br from-blue-200 to-blue-300 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white ring-4 ring-blue-100">
                      <User className="w-12 h-12 text-blue-700" />
                    </div>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mt-4">
                  {user.name}
                </h1>
                <p className="text-sm text-gray-500 capitalize font-medium mt-1">
                  {user.role === "client" ? "Client" : "Freelancer"}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">{user.email}</span>
                </div>
                {user.location && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">
                      {user.location}
                    </span>
                  </div>
                )}
              </div>

              {/* Role Badge */}
              <div className="flex justify-center">
                <div
                  className={`px-6 py-3 rounded-2xl font-semibold text-sm shadow-lg ${
                    user.role === "client"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                  }`}
                >
                  {user.role === "client" ? "💼 Client" : "⭐ Freelancer"}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            {user.bio && (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
                <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                  <Award className="w-8 h-8 text-blue-600" />
                  About {user.name}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {user.bio}
                </p>
              </div>
            )}

            {/* Skills */}
            {user.skills?.length > 0 && (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
                <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {user.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-5 py-3 rounded-2xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-200 hover:to-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Posted/Worked On Gigs */}
            {gigs.length > 0 && (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
                <h3 className="text-2xl font-bold text-blue-800 mb-8 flex items-center gap-3">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                  {user.role === "client"
                    ? "Gigs Posted"
                    : "Gigs Worked On"}{" "}
                  ({gigs.length})
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {gigs.map((gig) => (
                    <Link
                      to={`/gig/${gig._id}`}
                      key={gig._id}
                      className="group bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    >
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 mb-3 line-clamp-2 leading-tight">
                        {gig.title}
                      </h4>
                     
                      <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-lg text-gray-900">
                          ₹{gig.budget.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {gig.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {appliedGigs.length > 0 && (
  <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 mt-10">
    <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
      <Briefcase className="w-8 h-8 text-blue-600" />
      Gigs You've Applied To
    </h3>

    <div className="grid md:grid-cols-2 gap-6">
      {appliedGigs.map((gig) => (
  <Link
    to={`/gig/${gig._id}`}
    key={gig._id}
    className="group bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
  >
    <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 mb-1 line-clamp-2 leading-tight">
      {gig.title}
    </h4>

    {gig.approvedApplicant?.user &&
  gig.approvedApplicant.user.toString() === user._id.toString() && (
    <span className="bg-green-200 text-green-900 px-3 py-1 rounded-lg text-sm font-bold animate-pulse">
      Approved
    </span>
)}

    <div className="flex items-center gap-2 mb-4">
      <DollarSign className="w-4 h-4 text-blue-600" />
      <span className="font-bold text-lg text-gray-900">
        ₹{gig.budget.toLocaleString()}
      </span>
    </div>

    <p className="text-sm text-gray-600 line-clamp-2">
      {gig.description}
    </p>
  </Link>
))}
    </div>
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
}
