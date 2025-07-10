
const express = require('express');

const cors = require('cors');

const { Pool } = require('pg');

const fs = require('fs');

const path = require('path');



const app = express();

const PORT = process.env.PORT || 3001;



// Middleware

app.use(cors());

app.use(express.json());



// Database connection

const pool = new Pool({

  host: process.env.DB_HOST || 'postgres',

  port: process.env.DB_PORT || 5432,

  user: process.env.DB_USER || 'postgres',

  password: process.env.DB_PASSWORD || 'postgres',

  database: process.env.DB_NAME || 'habittracker',

});



// Initialize database

async function initDatabase() {

  try {

    const schemaPath = path.join(__dirname, 'database', 'schema.sql');

    const schema = fs.readFileSync(schemaPath, 'utf8');

    await pool.query(schema);

    console.log('Database initialized successfully');

  } catch (error) {

    console.error('Database initialization failed:', error);

  }

}



// Routes

app.get('/api/habits', async (req, res) => {

  try {

    const result = await pool.query('SELECT * FROM habits ORDER BY created_at DESC');

    res.json(result.rows);

  } catch (error) {

    res.status(500).json({ error: 'Failed to fetch habits' });

  }

});



app.post('/api/habits', async (req, res) => {

  try {

    const { name, description } = req.body;

    const result = await pool.query(

      'INSERT INTO habits (name, description) VALUES ($1, $2) RETURNING *',

      [name, description]

    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    res.status(500).json({ error: 'Failed to create habit' });

  }

});



app.get('/api/habits/:id/logs', async (req, res) => {

  try {

    const { id } = req.params;

    const result = await pool.query(

      'SELECT * FROM habit_logs WHERE habit_id = $1 ORDER BY completed_date DESC',

      [id]

    );

    res.json(result.rows);

  } catch (error) {

    res.status(500).json({ error: 'Failed to fetch habit logs' });

  }

});



app.post('/api/habits/:id/log', async (req, res) => {

  try {

    const { id } = req.params;

    const { completed_date } = req.body;

    const result = await pool.query(

      'INSERT INTO habit_logs (habit_id, completed_date) VALUES ($1, $2) ON CONFLICT (habit_id, completed_date) DO NOTHING RETURNING *',

      [id, completed_date]

    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    res.status(500).json({ error: 'Failed to log habit' });

  }

});



// Health check

app.get('/health', (req, res) => {

  res.json({ status: 'OK', timestamp: new Date().toISOString() });

});



// Start server

app.listen(PORT, async () => {

  console.log(`Backend server running on port ${PORT}`);

  await initDatabase();

});

