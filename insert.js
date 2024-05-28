const pool = require('./db_config');

// Data yang ingin dimasukkan ke dalam tabel users
const userData = {
  username: 'anggol1',
  email: 'anggol@gmail.com',
  password: 'pass123'
};

// Perintah SQL INSERT untuk menyisipkan data ke dalam tabel users
const insertQuery = {
  text: `INSERT INTO users(username, email, password) VALUES($1, $2, $3)`,
  values: [userData.username, userData.email, userData.password]
};

// Menjalankan perintah SQL INSERT menggunakan pool koneksi
pool.query(insertQuery, (err, res) => {
  if (err) {
    console.error('Error inserting data:', err);
  } else {
    console.log('Data inserted successfully');
  }
  pool.end(); // Menutup koneksi pool setelah selesai
});
