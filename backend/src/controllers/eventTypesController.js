const EventType = require('../models/EventType');

const eventTypeModel = new EventType();

// Get all event types
const getEventTypes = async (req, res) => {
  try {
    const eventTypes = await eventTypeModel.findAll();
    res.json(eventTypes);
  } catch (error) {
    console.error('Error fetching event types:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get single event type
const getEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const eventType = await eventTypeModel.findById(id);
    
    if (!eventType) {
      return res.status(404).json({ error: 'Event type not found' });
    }

    res.json(eventType);
  } catch (error) {
    console.error('Error fetching event type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create event type
const createEventType = async (req, res) => {
  try {
    const { name, description, duration, color, location, isActive = true, userId } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const eventType = await eventTypeModel.create({
      name,
      description: description || '',
      duration: duration || 30,
      color: color || '#006BFF',
      location: location || 'videoCall',
      isActive,
      userId: userId || '00000000-0000-0000-0000-000000000000'
    });
    
    res.status(201).json(eventType);
  } catch (error) {
    console.error('Error creating event type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update event type
const updateEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const eventType = await eventTypeModel.update(id, updates);
    
    if (!eventType) {
      return res.status(404).json({ error: 'Event type not found' });
    }

    res.json(eventType);
  } catch (error) {
    console.error('Error updating event type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete event type
const deleteEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const eventType = await eventTypeModel.delete(id);
    
    if (!eventType) {
      return res.status(404).json({ error: 'Event type not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting event type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getEventTypes,
  getEventType,
  createEventType,
  updateEventType,
  deleteEventType
};
