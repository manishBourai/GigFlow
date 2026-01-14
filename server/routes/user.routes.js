import express from "express";
import User from "../models/User.js";
import Gig from "../models/Gig.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Gigs posted (if client)
    const postedGigs = await Gig.find({ postedBy: user._id });

    // Gigs applied
    const appliedGigs = await Gig.find({
      "applicants.user": user._id,
    });

    return res.json({
      user,
      postedGigs,
      appliedGigs,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
