const express = require('express');
const {
  getBookings,
  getBooking,
  createBooking,
  deleteBooking
} = require('../controllers/bookingsController');

const router = express.Router();

// GET /api/bookings - Get all bookings
router.get('/', getBookings);

// GET /api/bookings/:id - Get single booking
router.get('/:id', getBooking);

// POST /api/bookings - Create booking
router.post('/', createBooking);

// DELETE /api/bookings/:id - Delete/cancel booking
router.delete('/:id', deleteBooking);


module.exports = router;
