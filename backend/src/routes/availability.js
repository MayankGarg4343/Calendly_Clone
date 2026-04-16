const express = require('express');
const {
  getAvailability,
  updateAvailability
} = require('../controllers/availabilityController');

const router = express.Router();

// GET /api/availability - Get all availability
router.get('/', getAvailability);

// PUT /api/availability - Update availability
router.put('/', updateAvailability);

module.exports = router;
