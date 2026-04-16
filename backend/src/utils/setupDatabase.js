const { Client } = require('pg');
const pool = require('../config/database');

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // First connect to postgres database to create the target database
    const client = new Client({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      database: 'postgres',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    
    await client.connect();
    
    // Create database if it doesn't exist
    try {
      await client.query('CREATE DATABASE calendly_clone');
      console.log('Database created successfully');
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log('Database already exists');
      } else {
        throw err;
      }
    }
    
    await client.end();
    
    // Test connection to the target database
    await pool.query('SELECT NOW()');
    console.log('Database connection successful');
    
    // Create tables from schema
    const fs = require('fs');
    const path = require('path');
    
    // Load main schema
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Load contacts schema
    const contactsPath = path.join(__dirname, '../../database/contacts.sql');
    const contactsSchema = fs.readFileSync(contactsPath, 'utf8');

    // Load routing rules migration
    const routingMigrationPath = path.join(__dirname, '../../database/migration_routing_rules.sql');
    const routingMigration = fs.readFileSync(routingMigrationPath, 'utf8');

    // Execute main schema as a single transaction
    try {
      await pool.query('BEGIN');
      await pool.query(schema);
      await pool.query('COMMIT');
      console.log('Main schema executed successfully');
    } catch (err) {
      await pool.query('ROLLBACK');
      console.error('Error executing main schema:', err.message);
      // Continue anyway as some tables might already exist
    }
    
    // Execute contacts schema
    try {
      await pool.query('BEGIN');
      await pool.query(contactsSchema);
      await pool.query('COMMIT');
      console.log('Contacts schema executed successfully');
    } catch (err) {
      await pool.query('ROLLBACK');
      console.error('Error executing contacts schema:', err.message);
      // Continue anyway
    }
    
    // Execute routing migration
    try {
      await pool.query('BEGIN');
      await pool.query(routingMigration);
      await pool.query('COMMIT');
      console.log('Routing migration executed successfully');
    } catch (err) {
      await pool.query('ROLLBACK');
      console.error('Error executing routing migration:', err.message);
      // Continue anyway
    }
    
    console.log('Database setup complete');
    return true;
  } catch (error) {
    console.error('Database setup failed:', error);
    return false;
  }
}

module.exports = { setupDatabase };
