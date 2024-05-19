// Import paket yang diperlukan
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

// Inisialisasi aplikasi Express
const app = express();

// Konfigurasi koneksi ke PostgreSQL (NeonDB)
const pool = new Pool({
    user: 'neondb_owner',
    host: 'ep-shy-boat-a105awkq.ap-southeast-1.aws.neon.tech',
    database: 'fathin_9',
    password: 'XplTUx3FSD8s',
    port: 5432,
    ssl: {
        rejectUnauthorized: false // Menggunakan SSL dengan NeonDB
    }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mendefinisikan rute untuk mendapatkan semua entri
app.get('/entries', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM entries ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mendefinisikan rute untuk menambah entri baru
app.post('/entries', async (req, res) => {
    try {
        const { name, message } = req.body;
        const result = await pool.query(
            'INSERT INTO entries (name, message) VALUES ($1, $2) RETURNING *',
            [name, message]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mendefinisikan rute untuk menghapus entri
app.delete('/entries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM entries WHERE id = $1', [id]);
        res.json({ message: 'Entry deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mendefinisikan rute untuk mengupdate entri (bonus)
app.put('/entries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, message } = req.body;
        const result = await pool.query(
            'UPDATE entries SET name = $1, message = $2 WHERE id = $3 RETURNING *',
            [name, message, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Menjalankan server pada port 4001
const PORT = process.env.PORT || 4001;
app.listen(PORT, async () => {
    try {
        // Menguji koneksi ke database saat server mulai
        await pool.connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});
