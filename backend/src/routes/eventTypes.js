const express = require('express');
const {
  getEventTypes,
  getEventType,
  createEventType,
  updateEventType,
  deleteEventType
} = require('../controllers/eventTypesController');

const router = express.Router();

// GET /api/event-types - Get all event types
router.get('/', getEventTypes);

// GET /api/event-types/:id - Get single event type
router.get('/:id', getEventType);

// POST /api/event-types - Create event type
router.post('/', createEventType);

// PUT /api/event-types/:id - Update event type
router.put('/:id', updateEventType);

// DELETE /api/event-types/:id - Delete event type
router.delete('/:id', deleteEventType);

module.exports = router;
