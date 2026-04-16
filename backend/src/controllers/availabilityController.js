const Availability = require('../models/Availability');

const availabilityModel = new Availability();

// Get all availability
const getAvailability = async (req, res) => {
  try {
    const availability = await availabilityModel.findByUserId('00000000-0000-0000-0000-000000000000');
    res.json(availability);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update availability
const updateAvailability = async (req, res) => {
  try {
    const { availability: availabilityData } = req.body;
    
    if (!Array.isArray(availabilityData)) {
      return res.status(400).json({ error: 'Availability data must be an array' });
    }

    const userId = '00000000-0000-0000-0000-000000000000';
    const results = [];

    for (const avail of availabilityData) {
      const existing = await availabilityModel.findByUserIdAndDay(userId, avail.dayOfWeek);
      
      if (existing) {
        const updated = await availabilityModel.update(existing.id, {
          startTime: avail.startTime,
          endTime: avail.endTime,
          isActive: avail.isActive !== false
        });
        results.push(updated);
      } else {
        const created = await availabilityModel.create({
          userId,
          dayOfWeek: avail.dayOfWeek,
          startTime: avail.startTime,
          endTime: avail.endTime,
          isActive: avail.isActive !== false
        });
        results.push(created);
      }
    }

    res.json({ availability: results });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAvailability,
  updateAvailability
};
