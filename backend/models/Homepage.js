// models/homepageModel.js
const mongoose = require('mongoose');

const homepageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model('Homepage', homepageSchema);
