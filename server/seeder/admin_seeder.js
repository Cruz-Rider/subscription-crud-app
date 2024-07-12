const mysql = require('mysql');
const bcrypt = require('bcryptjs');

require('dotenv').config();


async function seedAdmin() {
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

    try {
        const admin_exists = db.query('SELECT * FROM admin');

        if(admin_exists) {
            console.log('Admin exists already. DELETING...');
            db.query('DELETE FROM admin');
        }

        const admin_credentials = {
            email: "hello@wel.com",
            password: "PaSsWoRd",
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(admin_credentials.password, salt);

        const sql = `
          INSERT INTO admin (email, password)
          VALUES (?, ?)
        `;

        db.query(sql, [admin_credentials.email, hashedPassword]);
        console.log('Admin user created');

      } catch (error) {
        console.error('Error creating admin user:', error);
      } finally {
        db.end();
      }
}

seedAdmin();
