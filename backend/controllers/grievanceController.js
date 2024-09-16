// controllers/grievanceController.js
const Grievance = require('../models/Grievance');

exports.submitGrievance = async (req, res) => {
  const { name, email, grievance,remedy } = req.body;
  console.log(req.body);
  
  try {
    const newGrievance = new Grievance({ name, email, grievance,remedy  });
    await newGrievance.save();
    res.json({ message: 'Grievance submitted', grievance: newGrievance });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting grievance' });
  }
};

exports.getGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find();
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grievances' });
  }
};

exports.updateGrievanceStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedGrievance = await Grievance.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ message: 'Grievance status updated', grievance: updatedGrievance });
  } catch (error) {
    res.status(500).json({ message: 'Error updating grievance status' });
  }
};
