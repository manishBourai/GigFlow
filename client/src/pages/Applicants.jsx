import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function Applicants() {
  const { id } = useParams(); // gig id
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/gigs/${id}/applicants`);
        setApplicants(res.data.applicants);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSelect = async (userId) => {
    try {
      const res = await api.post(`/gigs/${id}/approve/${userId}`);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to select freelancer");
    }
  };

  if (loading) return <p>Loading applicants...</p>;

  if (applicants.length === 0)
    return <p>No applicants yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Applicants</h2>
      {applicants.map((app) => (
        <div
          key={app.user._id}
          className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
        >
          <div>
            <p className="font-semibold text-gray-900">
              {app.user.name}
            </p>
            <p className="text-sm text-gray-600">
              {app.user.email}
            </p>
            {app.message && (
              <p className="mt-1 text-sm text-gray-700">
                "{app.message}"
              </p>
            )}
          </div>
          <button
            onClick={() => handleSelect(app.user._id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Select Freelancer
          </button>
        </div>
      ))}
    </div>
  );
}
