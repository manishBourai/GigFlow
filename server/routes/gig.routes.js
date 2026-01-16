import { Router } from "express";
import Gig from "../models/Gig.js";
import isClient from "../middleware/isClient.js";
import {isLoggedIn} from "../middleware/auth.js"


const router=Router()

router.post("/",isLoggedIn,isClient, async (req, res) => {
  const gig = await Gig.create(req.body);
  res.json(gig);
});

router.get("/", async (req, res) => {
  const gigs = await Gig.find()
    .populate("postedBy", "name")
    .populate("applicants.user", "_id");
  res.json(gigs);
});

router.get("/:gigId",isLoggedIn, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId).populate(
      "postedBy",
      "name role"
    );

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:gigId/apply",isLoggedIn, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    const alreadyApplied = gig.applicants.some(
      a => a.user.toString() === req.user._id.toString()
    );
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    gig.applicants.push({
      user: req.user._id,
      message: req.body.message,
      appliedAt: new Date()
    });

    await gig.save();
    res.json({ message: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:gigId/approve/:userId",isLoggedIn, async (req, res) => {
  try {
    const { gigId, userId } = req.params;

    const gig = await Gig.findById(gigId);

    if (!gig)
      return res.status(404).json({ message: "Gig not found" });

    // Only the client who posted the gig can approve
    if (gig.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Check if user applied
    const applied = gig.applicants.some(
      (a) => a.user.toString() === userId
    );

    if (!applied)
      return res.status(400).json({ message: "User didn’t apply" });

    // Set approved applicant
    gig.approvedApplicant = {
      user: userId,
      approvedAt: new Date(),
    };

    await gig.save();

    res.status(201).json({ message: "Freelancer selected successfully",data:gig });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:gigId/applicants",isLoggedIn, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId)
      .populate("applicants.user", "name email");
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    // only the client who posted can view
    if (gig.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json({ applicants: gig.applicants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





export default router;
