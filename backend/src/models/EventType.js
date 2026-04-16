const BaseModel = require('./index');

class EventType extends BaseModel {
  constructor() {
    super('event_types');
  }

  async findAll() {
    try {
      const query = `
        SELECT id, name, description, duration, color, location, is_active, user_id,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM event_types
        ORDER BY created_at DESC
      `;
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching event types:', error);
      throw error;
    }
  }

  async findByUserId(userId) {
    try {
      const query = `
        SELECT id, name, description, duration, color, location, is_active, user_id,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM event_types
        WHERE user_id = $1
        ORDER BY created_at DESC
      `;
      const result = await this.pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching event types by user:', error);
      throw error;
    }
  }

  async create(data) {
    try {
      const { name, description, duration, color, location, isActive, userId } = data;
      
      const query = `
        INSERT INTO event_types (name, description, duration, color, location, is_active, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, name, description, duration, color, location, is_active, user_id,
                  created_at as "createdAt", updated_at as "updatedAt"
      `;
      
      const result = await this.pool.query(query, [
        name,
        description,
        duration,
        color || '#006BFF',
        location,
        isActive !== undefined ? isActive : true,
        userId
      ]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Error creating event type:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const { name, description, duration, color, location, isActive } = data;
      
      const query = `
        UPDATE event_types 
        SET name = $1, description = $2, duration = $3, color = $4, location = $5, is_active = $6, updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING id, name, description, duration, color, location, is_active, user_id,
                  created_at as "createdAt", updated_at as "updatedAt"
      `;
      
      const result = await this.pool.query(query, [
        name,
        description,
        duration,
        color,
        location,
        isActive !== undefined ? isActive : true,
        id
      ]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Error updating event type:', error);
      throw error;
    }
  }
}

module.exports = EventType;
