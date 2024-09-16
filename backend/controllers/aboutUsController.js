const AboutUs = require('../models/aboutUsModel');

exports.getSections = async (req, res) => {
  try {
    const sections = await AboutUs.find();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sections' });
  }
};

exports.addSection = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newSection = new AboutUs({ title, content });
    await newSection.save();
    res.status(201).json({ section: newSection });
  } catch (error) {
    res.status(500).json({ message: 'Error adding section' });
  }
};

exports.updateSection = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedSection = await AboutUs.findByIdAndUpdate(id, { title, content }, { new: true });
    res.json(updatedSection);
  } catch (error) {
    res.status(500).json({ message: 'Error updating section' });
  }
};

exports.deleteSection = async (req, res) => {
  const { id } = req.params;
  try {
    await AboutUs.findByIdAndDelete(id);
    res.json({ message: 'Section deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting section' });
  }
};
