const express = require('express');
const router = express.Router();
const LeaveRequest = require('../models/LeaveRequest');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/role');

// Create a new leave request
router.post('/leave', authMiddleware, async (req, res) => {
  const { employeeId, reason, Fromdate, Todate } = req.body;
  try {
    const newLeaveRequest = new LeaveRequest({
      employeeId,
      reason,
      Fromdate,
      Todate
    });
    await newLeaveRequest.save();
    res.status(201).json(newLeaveRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all leave requests
router.get('/leave', authMiddleware, checkRole(['admin']), async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate('employeeId');
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific leave request by ID
router.get('/leave/:leaveRequestId', authMiddleware, checkRole(['admin']), async (req, res) => {
  try {
   
    const leaveRequest = await LeaveRequest.findById(req.params.leaveRequestId).populate('employeeId');
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json(leaveRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a leave request by ID
router.put('/leave/:leaveRequestId', authMiddleware, checkRole(['admin']), async (req, res) => {
  try {
    const updates = req.body;
    const updatedLeaveRequest = await LeaveRequest.findByIdAndUpdate(req.params.leaveRequestId, updates, { new: true });
    if (!updatedLeaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json(updatedLeaveRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a leave request by ID
router.delete('/leave/:leaveRequestId', authMiddleware, checkRole(['admin']), async (req, res) => {
  try {
    const deletedLeaveRequest = await LeaveRequest.findByIdAndDelete(req.params.leaveRequestId);
    if (!deletedLeaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json({ message: 'Leave request deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
