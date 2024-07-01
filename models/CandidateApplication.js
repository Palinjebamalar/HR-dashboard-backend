
const mongoose = require('mongoose');

const CandidateApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  resume: [String],
  coverLetter: { type: String, required: true },
  jobPosting: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting' }],
  hired: { type: Boolean, default: false },
 
});

module.exports = mongoose.model('CandidateApplication', CandidateApplicationSchema);
