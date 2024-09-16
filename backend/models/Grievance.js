// models/grievanceModel.js
const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  grievance: { type: String, required: true },
  remedy: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Grievance', grievanceSchema);
