const pool = require('./db_config');

const readUsers = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM users');
    console.log('Data from users table:', res.rows);
  } catch (err) {
    console.error('Error reading data:', err);
  } finally {
    client.release();
  }
};

readUsers();
