import { Router } from "express";
import Gig from "../models/Gig.js";
import isClient from "../middleware/isClient.js";


const router=Router()

router.post("/",isClient, async (req, res) => {
  const gig = await Gig.create(req.body);
  res.json(gig);
});

router.get("/", async (req, res) => {
  const gigs = await Gig.find()
    .populate("postedBy", "name")
    .populate("applicants.user", "_id");
  res.json(gigs);
});

router.get("/:gigId", async (req, res) => {
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

router.post("/:gigId/apply", async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) return res.status(404).json({ message: "Gig not found" });

    const alreadyApplied = gig.applicants.some(
      a => a.user.toString() === req.user._id.toString()
    );

    if (alreadyApplied) {
      return res.status(200).json({ message: "Already applied" });
    }

    gig.applicants.push({
      user: req.user._id,
      message: req.body.message || "",
      createdAt: new Date(),
    });

    await gig.save();
    res.json({ message: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router;
