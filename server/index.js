const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Connect to Databse
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.use(cors()); 
app.use(express.json());


// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = db.query('SELECT * FROM admin WHERE email = ?', [email]);
    if (admin.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    db.query('SELECT * FROM admin WHERE email = ?', [email], (err, result) => {
      result.forEach(element => {
        const validPassword = bcrypt.compare(password, element.password);
        if (!validPassword) {
          res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ 
          message: 'Login Successfull!',
          element
        });
      });
    });
  } catch (err) {
    console.error('Error logging in admin:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// GET Client Data 
app.get('/api/client_data', async (req, res) => {
    db.query('SELECT * FROM clients', (err, result) => {
    res.json(result);
  })
});


// Create New Client
app.post('/api/add_client', async (req, res) => {
    const {name, email, mobile_number, address, start_date, end_date, password} = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    try {
      db.query('INSERT INTO clients (name, email, mobile_number, address, subscription_start_date, subscription_end_date, password) \
        VALUE (?, ?, ?, ?, ?, ?, ?)', [name, email, mobile_number, address, start_date, end_date, hashedPassword], (err, result) => {
        
          if(err) {
            console.error(err.message);
            res.status(401).json(err)
          }
            res.status(200).json(result);
        })
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
});

// Update Client Data


// Delete Client
app.delete('/api/client_data/:id', async (req, res) => {
  try {
    db.query('DELETE FROM clients WHERE id = ?', [req.params.id], (err, result) => {
    if(err) {
      res.status(401).json(err);
    }
      res.status(200).json(result);
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
