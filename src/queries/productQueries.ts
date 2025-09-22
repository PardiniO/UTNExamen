export const CREATE_PROD = `
    INSERT INTO producto (nombre, precio_unitario, stock)
    VALUES (?, ?, ?);
`;

export const GET_ALL_PROD = `SELECT * FROM producto;`;

export const GET_PROD_BY_ID = `SELECT * FROM producto WHERE id = ?;`;

export const UPDATE_PROD = `
    UPDATE producto
    SET nombre = ?, precio_unitario = ?, stock = ?
    WHERE id = ?;
`;

export const DELETE_PROD = `DELETE FROM producto WHERE id = ?;`;