const express = require('express');
const {
  getIntegrations,
  connectIntegration,
  disconnectIntegration
} = require('../controllers/integrationsController');

const router = express.Router();

// GET /api/integrations - Get all integrations
router.get('/', getIntegrations);

// POST /api/integrations/:id/connect - Connect integration
router.post('/:id/connect', connectIntegration);

// DELETE /api/integrations/:id/disconnect - Disconnect integration
router.delete('/:id/disconnect', disconnectIntegration);

module.exports = router;
