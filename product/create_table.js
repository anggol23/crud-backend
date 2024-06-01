const pool = require('./db_config');

const createTable = async () => {
  const client = await pool.connect();
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        nama_baju VARCHAR(100) NOT NULL,
        harga NUMERIC NOT NULL,
        foto VARCHAR(255)
      )
    `;
    await client.query(query);
    console.log("Table 'products' created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    client.release();
  }
};

createTable();
