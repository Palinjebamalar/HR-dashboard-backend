const express = require('express');
const router = express.Router();
const InterviewSchedule = require('../models/Interview');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/role');

// Schedule an interview for an applicant
router.post('/schedule', authMiddleware, checkRole(['admin']), async (req, res) => {
  const { candidate, jobPosting, interviewDate, interviewer, feedback } = req.body;
  try {
    const newInterviewSchedule = new InterviewSchedule({
      candidate,
      jobPosting,
      interviewDate,
      interviewer,
      feedback
    });
    await newInterviewSchedule.save();
    res.status(201).json(newInterviewSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all interview schedules
router.get('/schedule', authMiddleware, checkRole(['admin']), async (req, res) => {
  try {
    const interviewSchedules = await InterviewSchedule.find().populate('candidate', 'jobPosting');
    res.json(interviewSchedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific interview schedule by ID
router.get('/schedule/:scheduleId', authMiddleware, checkRole(['admin']), async (req, res) => {
  try {
  
    const interviewSchedule = await InterviewSchedule.findById(req.params.scheduleId).populate('candidate','jobPosting');
    if (!interviewSchedule) {
      return res.status(404).json({ message: 'Interview schedule not found' });
    }
    res.json(interviewSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an interview schedule by ID
router.put('/schedule/:scheduleId', authMiddleware, checkRole(['admin']), async (req, res) => {
  try {
 
    const updates = req.body;
    const updatedSchedule = await InterviewSchedule.findByIdAndUpdate(req.params.scheduleId, updates, { new: true });
    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Interview schedule not found' });
    }
    res.json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an interview schedule by ID
router.delete('/schedule/:scheduleId', authMiddleware, checkRole(['admin']), async (req, res) => {
  try {
    
    const deletedSchedule = await InterviewSchedule.findByIdAndDelete(req.params.scheduleId);
    if (!deletedSchedule) {
      return res.status(404).json({ message: 'Interview schedule not found' });
    }
    res.json({ message: 'Interview schedule deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
