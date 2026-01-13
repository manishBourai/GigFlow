import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, ArrowLeft, FileText, UserCheck, AlertCircle } from "lucide-react";
import api from "../api/axios";

export default function ApplyToGig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleApply = async () => {
    setLoading(true);
    setError("");
    
    try {
      const res = await api.post(`/gigs/${id}/apply`, { message: message || "" });
      console.log(res.data.message);
      
      // Handle both success and "Already applied" cases
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-blue-50 py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-xl p-12 shadow-xl border border-gray-200 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg">
              <UserCheck className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-blue-800 mb-4">Application Submitted!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Redirecting to gigs...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
          >
            <ArrowLeft className="w-5 h-5 text-blue-700" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-blue-800">Apply to Gig</h1>
            <p className="text-gray-600 mt-1 font-medium">Write your application message</p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-10">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Message Area */}
          <div className="space-y-4 mb-8">
            <label className="text-xl font-semibold text-blue-800 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              Application Message (Optional)
            </label>
            <textarea
              className="w-full h-64 p-6 text-lg border-2 border-gray-200 rounded-xl resize-vertical focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-200 hover:border-blue-300 bg-gray-50/50 placeholder-gray-500"
              placeholder="Tell the client why you're perfect for this gig (optional). Include your relevant experience, skills, estimated timeline..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Submit Button - NEVER DISABLED */}
          <button
            onClick={handleApply}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-5 px-8 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1 disabled:transform-none"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-6 h-6" />
                Submit Application
              </>
            )}
          </button>

          {/* Cancel Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(-1)}
              disabled={loading}
              className="text-blue-600 hover:text-blue-700 font-semibold px-4 py-2 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
