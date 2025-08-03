const mysql = require('mysql2/promise')
require('dotenv').config()

const pool = mysql.createPool({
    user: process.env.USER,
    database: process.env.NAME,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

async function initializeDatabase () {
    try {
        const connection = await pool.getConnection()

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE,
                password VARCHAR(255)
            )
            `)
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                content TEXT,
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
            `)

        await connection.query(`
            CREATE TABLE IF NOT EXISTS likes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                post_id INT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
                UNIQUE (user_id, post_id)
            )
            `)
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content TEXT,
                user_id INT,
                post_id INT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
            )
            `)
        
            console.log('Database connected and tables initialized')
            connection.release()
    } catch (err) {
        throw new Error(`Initializing database failed: ${err.message}`)
    }
}

initializeDatabase()

module.exports = pool