// backend/routes/homepageRoutes.js

const express = require('express');
const router = express.Router();
const Homepage = require('../models/Homepage'); // Correct model import

// Get all pages
router.get('/', async (req, res) => {
  try {
    const pages = await Homepage.find();
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new page
router.post('/', async (req, res) => {
  const page = new Homepage({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const newPage = await page.save();
    res.status(201).json(newPage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a page
router.put('/:id', async (req, res) => {
  try {
    const updatedPage = await Homepage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a page
router.delete('/:id', async (req, res) => {
  try {
    await Homepage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Page deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
