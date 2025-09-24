import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool ({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3309,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export async function waitForDB(retries = 12, delayMs = 2000): Promise<void> {
    let lastErr: unknown = null;
    for (let i = 0; i < retries; i++) {
        try {
            const conn = await pool.getConnection();
            conn.release();
            console.log('Conexión a la BD exitosa');
            return;
        } catch (err) {
            lastErr = err;
            console.warn(`BD no disponible (intento ${i + 1}/${retries}).
                Reintentando en ${delayMs}ms...`);
            await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
        }
    }
    console.error('No se pudo conectar a la BD después de varios intentos.', lastErr);
    throw lastErr;
}