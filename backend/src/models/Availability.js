const BaseModel = require('./index');

class Availability extends BaseModel {
  constructor() {
    super('availability');
  }

  async findByUserId(userId) {
    try {
      const query = `
        SELECT id, user_id, day_of_week, start_time, end_time, is_active,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM availability
        WHERE user_id = $1
        ORDER BY day_of_week ASC
      `;
      const result = await this.pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching availability by user:', error);
      throw error;
    }
  }

  async findByUserIdAndDay(userId, dayOfWeek) {
    try {
      const query = `
        SELECT id, user_id, day_of_week, start_time, end_time, is_active,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM availability
        WHERE user_id = $1 AND day_of_week = $2
      `;
      const result = await this.pool.query(query, [userId, dayOfWeek]);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching availability by user and day:', error);
      throw error;
    }
  }

  async create(data) {
    try {
      const { userId, dayOfWeek, startTime, endTime, isActive } = data;
      
      const query = `
        INSERT INTO availability (user_id, day_of_week, start_time, end_time, is_active)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, user_id, day_of_week, start_time, end_time, is_active,
                  created_at as "createdAt", updated_at as "updatedAt"
      `;
      
      const result = await this.pool.query(query, [
        userId,
        dayOfWeek,
        startTime,
        endTime,
        isActive !== undefined ? isActive : true
      ]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Error creating availability:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const { startTime, endTime, isActive } = data;
      
      const query = `
        UPDATE availability 
        SET start_time = $1, end_time = $2, is_active = $3, updated_at = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING id, user_id, day_of_week, start_time, end_time, is_active,
                  created_at as "createdAt", updated_at as "updatedAt"
      `;
      
      const result = await this.pool.query(query, [
        startTime,
        endTime,
        isActive !== undefined ? isActive : true,
        id
      ]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Error updating availability:', error);
      throw error;
    }
  }
}

module.exports = Availability;
