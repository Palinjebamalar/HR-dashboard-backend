const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/role');
const Employee = require('../models/Employee');
const CandidateApplication = require('../models/CandidateApplication');
const Interview = require('../models/Interview');
const JobPosting = require('../models/JobPosting');
const LeaveRequest = require('../models/LeaveRequest');
const Performance = require('../models/Performance');

router.get('/metrics', authMiddleware, checkRole(['admin']), async (req, res) => {
  try {
    const leaveCount = await LeaveRequest.find().count();
    const leaveRejectedCount = await LeaveRequest.find({ status: 'rejected' }).count();
    const leaveApprovedCount = await LeaveRequest.find({ status: 'approved' }).count();
    const employeeCount = await Employee.find().count();
    const candidateCount = await CandidateApplication.find().count();
    const interview = await Interview.find().count();
    const jobPosting = await JobPosting.find().count();
    const performance = await Performance.find().count(); 
    const candidateHired = await CandidateApplication.find({ hired: true }).count();
    const candidateNonHired = await CandidateApplication.find({ hired: false }).count();
    res.json({ leaveRejectedCount: leaveRejectedCount, leaveApprovedCount: leaveApprovedCount, jobPosting: jobPosting, performance: performance, candidateHired: candidateHired, candidateNonHired: candidateNonHired, leaveCount: leaveCount, employeeCount: employeeCount, candidateCount: candidateCount, interview: interview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
