const BaseModel = require('./index');

class Integration extends BaseModel {
  constructor() {
    super('integrations');
  }

  async findAll() {
    try {
      const query = `
        SELECT id, name, description, category, icon, is_connected, color, features, user_id,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM integrations
        ORDER BY created_at DESC
      `;
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching integrations:', error);
      throw error;
    }
  }

  async findByUserId(userId) {
    try {
      const query = `
        SELECT id, name, description, category, icon, is_connected, color, features, user_id,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM integrations
        WHERE user_id = $1
        ORDER BY created_at DESC
      `;
      const result = await this.pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching integrations by user:', error);
      throw error;
    }
  }

  async findByCategory(category) {
    try {
      const query = `
        SELECT id, name, description, category, icon, is_connected, color, features, user_id,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM integrations
        WHERE category = $1
        ORDER BY created_at DESC
      `;
      const result = await this.pool.query(query, [category]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching integrations by category:', error);
      throw error;
    }
  }

  async create(data) {
    try {
      const { name, description, category, icon, isConnected, color, features, userId } = data;
      
      const query = `
        INSERT INTO integrations (name, description, category, icon, is_connected, color, features, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, name, description, category, icon, is_connected, color, features, user_id,
                  created_at as "createdAt", updated_at as "updatedAt"
      `;
      
      const result = await this.pool.query(query, [
        name,
        description,
        category,
        icon,
        isConnected !== undefined ? isConnected : false,
        color || '#006BFF',
        features || [],
        userId
      ]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Error creating integration:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const { name, description, category, icon, isConnected, color, features } = data;
      
      const query = `
        UPDATE integrations 
        SET name = $1, description = $2, category = $3, icon = $4, is_connected = $5, color = $6, features = $7, updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING id, name, description, category, icon, is_connected, color, features, user_id,
                  created_at as "createdAt", updated_at as "updatedAt"
      `;
      
      const result = await this.pool.query(query, [
        name,
        description,
        category,
        icon,
        isConnected !== undefined ? isConnected : false,
        color,
        features,
        id
      ]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Error updating integration:', error);
      throw error;
    }
  }

  async toggleConnection(id) {
    try {
      const query = `
        UPDATE integrations 
        SET is_connected = NOT is_connected, updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING id, name, description, category, icon, is_connected, color, features, user_id,
                  created_at as "createdAt", updated_at as "updatedAt"
      `;
      
      const result = await this.pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error toggling integration connection:', error);
      throw error;
    }
  }
}

module.exports = Integration;
