import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3309,
    waitForConnections: true,
});

export async function testConnection() {
    try {
        const conn = await pool.getConnection();
        console.log('Conectado a MySQL en Docker');
        conn.release();
    } catch (err) {
        console.error('Error conectando la BD:', err);
    }
}