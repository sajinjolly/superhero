const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model('AboutUs', aboutUsSchema);
