const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const checkrole=require("../middleware/role")
const JobPosting=require("../models/JobPosting")

// Create a new job posting
router.post('/job', authMiddleware,checkrole(['admin']), async (req, res) => {
    const { title, description,location,salaryRange,postedAt,requirements } = req.body;
    try {
      const newJob = new JobPosting({ title,description,location,salaryRange,postedAt,requirements });
      await newJob.save();
      res.status(201).json(newJob);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  module.exports = router;