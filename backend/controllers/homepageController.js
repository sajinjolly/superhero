// controllers/homepageController.js
const Homepage = require('../models/Homepage');

exports.getHomepage = async (req, res) => {
  try {
    const pages = await Homepage.find();
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pages' });
  }
};

exports.addPage = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPage = new Homepage({ title, content });
    await newPage.save();
    res.json({ message: 'Page added', page: newPage });
  } catch (error) {
    res.status(500).json({ message: 'Error adding page' });
  }
};

exports.updatePage = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPage = await Homepage.findByIdAndUpdate(id, { title, content }, { new: true });
    res.json({ message: 'Page updated', page: updatedPage });
  } catch (error) {
    res.status(500).json({ message: 'Error updating page' });
  }
};

exports.deletePage = async (req, res) => {
  const { id } = req.params;
  try {
    await Homepage.findByIdAndDelete(id);
    res.json({ message: 'Page deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting page' });
  }
};
