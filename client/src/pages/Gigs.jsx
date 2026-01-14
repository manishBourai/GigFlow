import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import api from "../api/axios";
import { MapPin, DollarSign, User, Briefcase } from "lucide-react";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        const res = await api.get("/gigs");
        setGigs(res.data);
      } catch (err) {
        setError("Failed to load gigs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center py-20">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600"></div>
          <span className="text-xl font-medium text-gray-600">
            Loading gigs...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-6 text-center py-20">
        <div className="w-20 h-20 bg-red-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">{error}</h2>

        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
            Latest Freelance Gigs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover exciting opportunities and freelance projects from around
            the world.
          </p>
        </header>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-800">{gigs.length}</p>
                <p className="text-gray-600 font-medium text-lg">Active Gigs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gigs Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gigs.length > 0 ? (
            gigs.map((gig) => {
              const applied =
                user &&
                gig.applicants?.some((a) => a.user.toString() === user._id);

              return (
                <div
                  key={gig._id}
                  className="group bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]"
                >
                  <div className="p-8">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-semibold px-4 py-2 rounded-full mb-4">
                      <Briefcase className="w-3 h-3" />
                      Freelance
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-4 line-clamp-2 leading-tight">
                      {gig.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 text-base">
                      {gig.description}
                    </p>

                    {/* Meta */}
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-lg text-gray-900">
                          ₹{gig.budget.toLocaleString()}
                        </span>
                      </div>

                      {gig.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{gig.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {gig.postedBy?.name || "Anonymous"}
                          </p>
                          <p className="text-xs text-gray-500">Client</p>
                        </div>
                      </div>

                      {applied ? (
                        <div className="bg-gradient-to-r from-green-100 to-green-200 border border-green-200 text-green-800 px-6 py-3 rounded-2xl font-semibold text-sm shadow-md backdrop-blur-sm">
                          ✓ Applied
                        </div>
                      ) : (
                        <Link
                          to={`/gig/${gig._id}`}
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          View Gig
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // EMPTY CARD (when no gigs)
            <div className="col-span-full">
              <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-10 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                  <Briefcase className="w-10 h-10 text-blue-600" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  No gigs available
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  There are currently no gigs posted. Check back later for new
                  opportunities.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Refresh
                  </button>

                  <Link
                    to="/"
                    className="bg-white text-blue-700 border border-blue-600 px-8 py-3 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-200"
                  >
                    Go Home
                  </Link>

                  {user?.role === "client" && (
                    <Link
                      to="/create-gig"
                      className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Post a Gig
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
