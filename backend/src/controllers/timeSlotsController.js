// Mock data for time slots (since database is not initialized)

// Get available time slots for event type
const getAvailableTimeSlots = async (req, res) => {
  try {
    const { eventTypeId } = req.params;
    const { date } = req.query;
    
    if (!eventTypeId) {
      return res.status(400).json({ error: 'Event type ID is required' });
    }

    // Generate mock time slots based on event type
    const baseTimeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    // Remove some slots to simulate availability
    const availableSlots = baseTimeSlots.filter((slot, index) => {
      // Simulate some slots being unavailable
      return index % 3 !== 0 && index % 5 !== 2;
    });

    res.json({
      eventTypeId,
      date: date || new Date().toISOString().split('T')[0],
      availableSlots: availableSlots.map(time => ({
        time,
        available: true
      }))
    });
  } catch (error) {
    console.error('Error fetching time slots:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAvailableTimeSlots
};
