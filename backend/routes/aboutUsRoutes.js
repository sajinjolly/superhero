const express = require('express');
const {
  getSections,
  addSection,
  updateSection,
  deleteSection
} = require('../controllers/aboutUsController');

const router = express.Router();

// Get all sections
router.get('/', getSections);

// Add a new section
router.post('/', addSection);

// Update a section
router.put('/:id', updateSection);

// Delete a section
router.delete('/:id', deleteSection);

module.exports = router;
