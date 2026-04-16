const pool = require('../config/database');

class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
    this.pool = pool;
  }

  async findAll() {
    try {
      const result = await this.pool.query(`SELECT * FROM ${this.tableName}`);
      return result.rows;
    } catch (error) {
      console.error(`Error fetching all ${this.tableName}:`, error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const result = await this.pool.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error fetching ${this.tableName} by id:`, error);
      throw error;
    }
  }

  async create(data) {
    try {
      const columns = Object.keys(data);
      const values = Object.values(data);
      const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
      
      const query = `
        INSERT INTO ${this.tableName} (${columns.join(', ')})
        VALUES (${placeholders})
        RETURNING *
      `;
      
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(`Error creating ${this.tableName}:`, error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const columns = Object.keys(data);
      const values = Object.values(data);
      const setClause = columns.map((col, index) => `${col} = $${index + 2}`).join(', ');
      
      const query = `
        UPDATE ${this.tableName}
        SET ${setClause}
        WHERE id = $1
        RETURNING *
      `;
      
      const result = await this.pool.query(query, [id, ...values]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error updating ${this.tableName}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const result = await this.pool.query(`DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`, [id]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error deleting ${this.tableName}:`, error);
      throw error;
    }
  }
}

module.exports = BaseModel;
