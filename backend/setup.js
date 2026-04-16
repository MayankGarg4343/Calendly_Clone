const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Setting up Calendly Clone Backend...');

// Check if PostgreSQL is installed
try {
  execSync('psql --version', { stdio: 'inherit' });
  console.log('✅ PostgreSQL is installed');
} catch (error) {
  console.error('❌ PostgreSQL is not installed or not in PATH');
  console.log('📋 Please install PostgreSQL: https://www.postgresql.org/download/');
  process.exit(1);
}

// Check if database exists
try {
  execSync('createdb calendly_clone', { stdio: 'inherit' });
  console.log('✅ Database created or already exists');
} catch (error) {
  console.log('⚠️  Database might already exist');
}

// Run schema setup
console.log('🗄️  Running database schema...');
try {
  execSync('psql -U postgres -d calendly_clone -f database/schema.sql', { stdio: 'inherit' });
  console.log('✅ Database schema applied successfully');
} catch (error) {
  console.error('❌ Failed to apply schema:', error.message);
  process.exit(1);
}

// Start the server
console.log('🌟 Starting backend server...');
try {
  require('./src/index.js');
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
}

console.log('✅ Setup complete!');
console.log('📊 Backend API: http://localhost:5000');
console.log('📊 Health check: http://localhost:5000/health');
console.log('🌍 Frontend should connect to: http://localhost:3000');
