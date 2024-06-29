const express = require('express');
const router = express.Router();
const CandidateApplication = require('../models/CandidateApplication');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/role');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const jobPosting=require("../models/JobPosting")



// Create a new candidate application
  router.post('/apply', authMiddleware, checkRole(['applicant']), async (req, res) => {
    try {
      const { name, resume, coverLetter } = req.body;
      const newApplication = new CandidateApplication({ name, resume, coverLetter });
      await newApplication.save();
      res.status(201).json(newApplication);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Get all candidate applications
    router.get('/applications', authMiddleware, checkRole(['admin', 'employee']), async (req, res) => {
    try {
      const applications = await CandidateApplication.find();
      // .populate('appliedJobs')
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get a specific candidate application by ID
  router.get('/applications/:applicationId', authMiddleware, checkRole(['admin','employee']), async (req, res) => {
    try {
     
      const applications = await CandidateApplication.find(req.params.jobId)
      // const applications = await CandidateApplication.find({ appliedJobs: jobId }).populate('appliedJobs');
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update a candidate application by ID
router.put('/applications/:applicationId', authMiddleware, checkRole(['admin']), async (req, res) => {
    try {
   
      const updates = req.body;
      const updatedApplication = await CandidateApplication.findByIdAndUpdate(req.params.applicationId, updates);
      if (!updatedApplication) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.json(updatedApplication);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete a candidate application by ID
  router.delete('/applications/:applicationId', authMiddleware, checkRole(['admin']), async (req, res) => {
    try {
    
      const deletedApplication = await CandidateApplication.findByIdAndDelete(req.params.applicationId);
      if (!deletedApplication) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.json({ message: 'Application deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;


  
  








  // Get all candidate applications
router.get('/applications', authMiddleware, checkRole(['admin', 'user']), async (req, res) => {
    try {
      const applications = await CandidateApplication.find().populate('appliedJobs');
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });