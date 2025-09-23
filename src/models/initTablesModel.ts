import { pool, testConnection } from "../config/db";

export async function initTables() {
    try {
        await testConnection();
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuario (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                contraseña VARCHAR(255) NOT NULL,
                fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                rol ENUM('superAdmin', 'admin', 'user') DEFAULT 'user'
            ); 
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS producto (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                precio_unitario DECIMAL(10,2) NOT NULL,
                stock INT DEFAULT 0
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS pedido (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_usuario INT NOT NULL,
                fecha_pedido DATE NOT NULL,
                estado ENUM('pendiente', 'enviado', 'entregado', 'cancelado') DEFAULT 'pendiente'
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS pedido_p (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_pedido INT NOT NULL,
                id_producto INT NOT NULL,
                cantidad INT NOT NULL,
                precio_unitario DECIMAL(10,2) NOT NULL
            );
        `);

        console.log("Todas las tablas creadas correctamente");
    } catch (err) {
        console.log("Error creando tablas:", err);
        throw err;
    }
}