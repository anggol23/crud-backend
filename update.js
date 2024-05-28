const pool = require('./db_config');

const updateUser = async (id, newUsername, newEmail, newPassword) => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE users
      SET username = $1, email = $2, password = $3
      WHERE id = $4
    `;
    const values = [newUsername, newEmail, newPassword, id];
    const res = await client.query(query, values);
    if (res.rowCount > 0) {
      console.log(`User with ID ${id} updated successfully`);
    } else {
      console.log(`No user found with ID ${id}`);
    }
  } catch (err) {
    console.error('Error updating user:', err);
  } finally {
    client.release();
  }
};

// Panggil fungsi updateUser dengan data yang ingin diperbarui
updateUser(1, 'contoh_usersatu23', 'contoh@example.com', 'new_password123');
