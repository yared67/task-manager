const PORT = process.env.PORT ?? 8000;
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://task-manager-taupe-seven.vercel.app']
}));
app.use(express.json());

// Status endpoint
app.get('/status', (req, res) => {
  res.status(200).send('Server is running');
});

// Get all todos
app.get('/todos/:userEmail', async (req, res) => {
  const { userEmail } = req.params;
  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
    res.json(todos.rows);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new todo
app.post('/todos', async (req, res) => {
  const { user_email, title, progress, date } = req.body; 

  const id = uuidv4();
  try {
    const newToDo = await pool.query(
      'INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5) RETURNING *',  
      [id, user_email, title, progress, date]
    );
    res.status(201).json(newToDo.rows[0]);
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Edit a todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;  
  try {
    const editToDo = await pool.query(
      'UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5 RETURNING *',  
      [user_email, title, progress, date, id]
    );
    res.json(editToDo);
  } catch (err) {
    console.error('Error editing todo:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    res.json(deleteToDo);
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Signup
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const signUp = await pool.query('INSERT INTO users(email, hashed_password) VALUES($1, $2) RETURNING *', [email, hashedPassword]);
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1hr' });
    res.status(201).json({ email, token });
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json({ detail: err.detail });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!users.rows.length) {
      return res.status(404).json({ detail: 'User does not exist' });
    }
    const success = await bcrypt.compare(password, users.rows[0].hashed_password);
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1hr' });
    if (success) {
      res.json({ email: users.rows[0].email, token });
    } else {
      res.status(401).json({ detail: 'Login failed' });
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
