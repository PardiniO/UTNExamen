export const USER_TABLE = `
    CREATE TABLE IF NOT EXISTS usuario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        contraseña VARCHAR(255) NOT NULL,
        fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        rol ENUM('superAdmin', 'admin', 'user') DEFAULT 'user'
    );
`;