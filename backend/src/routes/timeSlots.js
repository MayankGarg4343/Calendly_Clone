const express = require('express');
const { getAvailableTimeSlots } = require('../controllers/timeSlotsController');

const router = express.Router();

// GET /api/time-slots/:eventTypeId - Get available time slots for event type
router.get('/:eventTypeId', getAvailableTimeSlots);

module.exports = router;
