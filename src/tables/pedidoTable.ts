export const PEDIDO_TABLE = `
    CREATE TABLE IF EXISTS pedido (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        fecha_pedido DATE NOT NULL,
        estado VARCHAR(50) NOT NUL,
    );
`;