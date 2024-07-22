const PORT = process.env.PORT ?? 4000;
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json());

// Get all todos
app.get('/todos/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
        res.json(todos.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Create a new todo
app.post('/todos', async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    const id = uuidv4();
    try {
        const newToDo = await pool.query('INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)',
            [id, user_email, title, progress, date]);
        res.json(newToDo.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Edit a todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { user_email, title, progress, date } = req.body;
    try {
        const editToDo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5 RETURNING *',
            [user_email, title, progress, date, id]);
        if (editToDo.rows.length === 0) {
            return res.status(404).send('Todo not found');
        }
        res.json(editToDo.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
        if (deleteToDo.rows.length === 0) {
            return res.status(404).send('Todo not found');
        }
        res.json(deleteToDo.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        const signUp = await pool.query('INSERT INTO users(email, hashed_password) VALUES($1, $2) ', [email, hashedPassword]);
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
        res.json({email, token });
    } catch (err) {
        console.error(err);
     if(err) {

        res.json({detail: err.detail})
     }
       
      
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
       
        const match = bcrypt.compareSync(password, users.rows[0].hashed_password);
        if (!users.rows.length) return res.json({ detail: 'user does not exist'})
           await bcrypt.compare(password, users.rows[0].hashed_password)
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });

        if (sucess){
            res.json({'email' : users.rows[0].email, token})
        }else {

        res.json({ detail: "Login failed" });
    }
    
 } catch (err) {
        console.error(err);
      
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 