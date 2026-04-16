const Integration = require('../models/Integration');

const integrationModel = new Integration();

// Get all integrations
const getIntegrations = async (req, res) => {
  try {
    console.log('GET /api/integrations - Fetching all integrations');
    const integrations = await integrationModel.findAll();
    console.log(`Found ${integrations.length} integrations`);
    res.json(integrations);
  } catch (error) {
    console.error('Error fetching integrations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Connect integration
const connectIntegration = async (req, res) => {
  try {
    const { id } = req.params;
    const integration = await integrationModel.toggleConnection(id);
    
    if (!integration) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    res.json(integration);
  } catch (error) {
    console.error('Error connecting integration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Disconnect integration
const disconnectIntegration = async (req, res) => {
  try {
    const { id } = req.params;
    const integration = await integrationModel.toggleConnection(id);
    
    if (!integration) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    res.json(integration);
  } catch (error) {
    console.error('Error disconnecting integration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getIntegrations,
  connectIntegration,
  disconnectIntegration
};
