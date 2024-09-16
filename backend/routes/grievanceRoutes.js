// routes/grievanceRoutes.js
const express = require('express');
const { submitGrievance, getGrievances, updateGrievanceStatus } = require('../controllers/grievanceController');

const router = express.Router();

router.post('/grievances', submitGrievance);
router.get('/grievances', getGrievances);
router.put('/grievances/:id', updateGrievanceStatus);

module.exports = router;
