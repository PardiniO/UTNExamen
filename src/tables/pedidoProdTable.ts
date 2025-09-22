export const PEDIDO_PROD_TABLE = `
    CREATE TABLE IF EXISTS pedido_p (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_pedido INT NOT NULL,
        id_producto INT NOT NULL,
        cantidad INT NOT NULL,
        precio_unitario DECIMAL(10,2) NOT NUL,
    );
`;