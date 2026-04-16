const pool = require('../config/database');

class Contact {
  // Get all contacts
  static async getAll() {
    try {
      const query = `
        SELECT id, name, email, phone, company, position, location, status,
               last_meeting as "lastMeeting", total_meetings as "totalMeetings",
               notes, created_at as "createdAt", updated_at as "updatedAt"
        FROM contacts
        ORDER BY created_at DESC
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  }

  // Get contact by ID
  static async getById(id) {
    try {
      const query = `
        SELECT id, name, email, phone, company, position, location, status,
               last_meeting as "lastMeeting", total_meetings as "totalMeetings",
               notes, created_at as "createdAt", updated_at as "updatedAt"
        FROM contacts
        WHERE id = $1
      `;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw error;
    }
  }

  // Create new contact
  static async create(data) {
    try {
      const { name, email, phone, company, position, location, status, lastMeeting, totalMeetings, notes } = data;
      
      const query = `
        INSERT INTO contacts (name, email, phone, company, position, location, status, last_meeting, total_meetings, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id, name, email, phone, company, position, location, status,
                  last_meeting as "lastMeeting", total_meetings as "totalMeetings",
                  notes, created_at as "createdAt", updated_at as "updatedAt"
      `;
      
      const result = await pool.query(query, [
        name,
        email,
        phone,
        company,
        position,
        location,
        status,
        lastMeeting,
        totalMeetings,
        notes
      ]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  // Update contact
  static async update(id, data) {
    try {
      const { name, email, phone, company, position, location, status, lastMeeting, totalMeetings, notes } = data;
      
      const query = `
        UPDATE contacts 
        SET name = $1, email = $2, phone = $3, company = $4, position = $5, location = $6, status = $7, 
            last_meeting = $8, total_meetings = $9, notes = $10, updated_at = CURRENT_TIMESTAMP
        WHERE id = $11
        RETURNING id, name, email, phone, company, position, location, status,
                  last_meeting as "lastMeeting", total_meetings as "totalMeetings",
                  notes, created_at as "createdAt", updated_at as "updatedAt"
      `;
      
      const result = await pool.query(query, [
        name,
        email,
        phone,
        company,
        position,
        location,
        status,
        lastMeeting,
        totalMeetings,
        notes,
        id
      ]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }

  // Delete contact
  static async delete(id) {
    try {
      const query = `
        DELETE FROM contacts 
        WHERE id = $1 
        RETURNING id, name, email
      `;
      
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
}

module.exports = Contact;
