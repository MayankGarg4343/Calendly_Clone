const BaseModel = require('./index');

class Booking extends BaseModel {
  constructor() {
    super('bookings');
  }

  async findAll() {
    try {
      const query = `
        SELECT id, event_type_id, name, email, date, start_time, end_time, notes, status,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM bookings
        ORDER BY date DESC, start_time DESC
      `;
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  async findByEventTypeId(eventTypeId) {
    try {
      const query = `
        SELECT id, event_type_id, name, email, date, start_time, end_time, notes, status,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM bookings
        WHERE event_type_id = $1
        ORDER BY date DESC, start_time DESC
      `;
      const result = await this.pool.query(query, [eventTypeId]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching bookings by event type:', error);
      throw error;
    }
  }

  async findByDate(date) {
    try {
      const query = `
        SELECT id, event_type_id, name, email, date, start_time, end_time, notes, status,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM bookings
        WHERE date = $1
        ORDER BY start_time ASC
      `;
      const result = await this.pool.query(query, [date]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching bookings by date:', error);
      throw error;
    }
  }

  async create(data) {
    try {
      const { eventTypeId, name, email, date, startTime, endTime, notes, status } = data;
      
      const query = `
        INSERT INTO bookings (event_type_id, name, email, date, start_time, end_time, notes, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, event_type_id, name, email, date, start_time, end_time, notes, status,
                  created_at as "createdAt", updated_at as "updatedAt"
      `;
      
      const result = await this.pool.query(query, [
        eventTypeId,
        name,
        email,
        date,
        startTime,
        endTime,
        notes,
        status || 'scheduled'
      ]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const { name, email, date, startTime, endTime, notes, status } = data;
      
      const query = `
        UPDATE bookings 
        SET name = $1, email = $2, date = $3, start_time = $4, end_time = $5, notes = $6, status = $7, updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING id, event_type_id, name, email, date, start_time, end_time, notes, status,
                  created_at as "createdAt", updated_at as "updatedAt"
      `;
      
      const result = await this.pool.query(query, [
        name,
        email,
        date,
        startTime,
        endTime,
        notes,
        status,
        id
      ]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  }
}

module.exports = Booking;
