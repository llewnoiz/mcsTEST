// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
export const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
// export const connection = null;

