const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('./db_config');

const app = express();
const port = 5000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(uploadsDir));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// CREATE product
app.post('/api/products', upload.single('foto'), async (req, res) => {
  const { nama_baju, harga } = req.body;
  const foto = req.file ? `uploads/${req.file.filename}` : null;

  console.log('Received data:', { nama_baju, harga, foto });

  try {
    const query = 'INSERT INTO products (nama_baju, harga, foto) VALUES ($1, $2, $3) RETURNING *';
    const values = [nama_baju, harga, foto];
    const result = await pool.query(query, values);
    console.log('Product inserted:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).send('Server error');
  }
});

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const query = 'SELECT * FROM products';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
