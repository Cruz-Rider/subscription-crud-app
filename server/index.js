const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQL_Shishir99',
  database: 'subscription_crud',
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


// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await db.query('SELECT * FROM admin WHERE email = ?', [email]);
    if (admin.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    await db.query('SELECT password FROM admin WHERE email = ?', [email], (err, result) => {
        result.forEach(element => {
            const validPassword = element.password;
            if (validPassword != password) {
                return res.status(401).json({ message: 'Invalid email or password' });
              }
            
            return res.status(200).json({ message: 'Login Successfull!' });
        });
    });
  } catch (err) {
    console.error('Error logging in admin:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET Client Data 
app.get('/api/client_data', async (req, res) => {
    await db.query('SELECT * FROM clients', (err, result) => {
        res.json(result);
    })
})

// Create New Client
app.post('api/add_client', async (req, res) => {
    const {name, email, mobile_number, address, start_date, end_date} = req.body;
    
    await db.query('INSERT INTO clients (name, email, mobile_number, address, subscription_start_date, subscription_end_date) VALUE (?, ?, ?, ?, ?, ?)', [name, email, mobile_number, address, start_date, end_date], (err, result) => {
        res.json(result);
    })
})

// Update Client Data


// Delete Client
app.delete('api/client_data/:id', async (req, res) => {
  await db.query('DELETE FROM clients WHERE id = ?', [req.params.id]);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
