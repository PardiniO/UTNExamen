export const PROD_TABLE = `
    CREATE TABLE IF NOT EXISTS producto (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        precio_unitario DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL
    );
`;