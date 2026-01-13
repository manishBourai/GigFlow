// client/src/pages/Register.jsx
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Create Account
        </h2>

        {/* Name */}
        <input
          name="name"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        {/* Email */}
        <input
          name="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        {/* Role */}
        <select
          name="role"
          className="w-full mb-6 px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        >
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
