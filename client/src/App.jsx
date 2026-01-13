// client/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Gigs from "./pages/Gigs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateGig from "./pages/CreateGig";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import GigDetail from "./pages/GigDetail";
import UserProfile from "./pages/UserProfile";
import ApplyToGig from "./pages/ApplyToGig";
import Footer from "./components/Footer";

export default function App() {
    const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gigs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-gig" element={<CreateGig />} />
        <Route path="/gig/:id" element={<GigDetail />} />
        <Route path="/user/:id" element={<UserProfile/>} />
        <Route path="/gig/apply/:id" element={<ApplyToGig/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
