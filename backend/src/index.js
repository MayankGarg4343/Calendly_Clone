const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { setupDatabase } = require('./utils/setupDatabase');
const eventTypesRoutes = require('./routes/eventTypes');
const availabilityRoutes = require('./routes/availability');
const bookingsRoutes = require('./routes/bookings');
const timeSlotsRoutes = require('./routes/timeSlots');
const contactsRoutes = require('./routes/contacts');
const integrationsRoutes = require('./routes/integrations');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/event-types', eventTypesRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/time-slots', timeSlotsRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/integrations', integrationsRoutes);
console.log('API Routes registered:');
console.log('  - /api/event-types');
console.log('  - /api/availability');
console.log('  - /api/bookings');
console.log('  - /api/time-slots');
console.log('  - /api/contacts');
console.log('  - /api/integrations');

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database
    const dbSetupSuccess = await setupDatabase();
    
    if (dbSetupSuccess) {
      console.log('Database initialized successfully');
    } else {
      console.log('Database setup failed, continuing with mock data');
    }
    
    // Start server only if not running in Vercel
    if (require.main === module) {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/health`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
      });
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    if (require.main === module) {
      process.exit(1);
    }
  }
}

// Start server only if running locally
if (require.main === module) {
  startServer();
}

// Export for Vercel serverless functions
module.exports = app;
