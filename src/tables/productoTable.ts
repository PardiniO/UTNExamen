export const PROD_TABLE = `
    CREATE TABLE IF NOT EXIST producto (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NUL,
        precio_unitario DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL
    );
`;