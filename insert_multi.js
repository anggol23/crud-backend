const pool = require('./db_config');

const usersData = [
  {username: 'anggap', email:'anggap@gmail.com', password:'54321'},
    {username: 'hallo', email:'hallo@gmail.com', password:'65472'},
    {username: 'gilang', email:'gilang@gmail.com', password:'776665'},
  // Tambahkan lebih banyak data sesuai kebutuhan
];

const insertUsers = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Memulai transaksi

    for (const user of usersData) {
      await client.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
        [user.username, user.email, user.password]
      );
    }

    await client.query('COMMIT'); // Commit transaksi jika tidak ada error
    console.log('All users inserted successfully');
  } catch (err) {
    await client.query('ROLLBACK'); // Rollback transaksi jika terjadi error
    console.error('Error inserting users:', err);
  } finally {
    client.release(); // Melepaskan koneksi
  }
};

insertUsers();
