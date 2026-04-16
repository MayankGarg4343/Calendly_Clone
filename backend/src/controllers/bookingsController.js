const Booking = require('../models/Booking');

const bookingModel = new Booking();

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.findAll();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get single booking
const getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingModel.findById(id);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create booking
const createBooking = async (req, res) => {
  try {
    const { eventTypeId, name, email, date, startTime, endTime, status = 'pending', notes } = req.body;
    
    if (!eventTypeId || !name || !email || !date || !startTime || !endTime) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const booking = await bookingModel.create({
      eventTypeId,
      name,
      email,
      date,
      startTime,
      endTime,
      status,
      notes: notes || ''
    });
    
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update booking
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const booking = await bookingModel.update(id, updates);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete booking
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingModel.delete(id);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking
};
