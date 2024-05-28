const pool = require('./db_config');

pool.query(`CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
)`, (err, res) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table "users" successfully created');
  }
  pool.end(); 
  // Menutup koneksi pool setelah selesai
});