const pool = require('./db_config');

const deleteUser = async (username) => {
  const client = await pool.connect();
  try {
    const query = 'DELETE FROM users WHERE username = $1';
    const res = await client.query(query, [username]);
    if (res.rowCount > 0) {
      console.log(`User with username ${username} deleted successfully`);
    } else {
      console.log(`No user found with username ${username}`);
    }
  } catch (err) {
    console.error('Error deleting user:', err);
  } finally {
    client.release();
  }
};

// Panggil fungsi deleteUser dengan username yang ingin dihapus
deleteUser('gilang');
