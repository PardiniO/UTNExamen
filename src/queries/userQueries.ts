const BASE_SELECT_USER = `
    SELECT id, nombre, email, rol, password
    FROM usuario
`;

export const SELECT_ALL_USERS = BASE_SELECT_USER + `;`;

export const SELECT_USER_BY_ID = BASE_SELECT_USER + `WHERE id = ?;`;

export const SELECT_USER_BY_EMAIL = BASE_SELECT_USER + `WHERE email = ?;`;

export const SELECT_USER_BY_ROLE = BASE_SELECT_USER + `WHERE rol = ?;`;

export const INSERT_USER = `
    INSERT INTO usuario (nombre, email, password, rol)
    VALUES (?, ?, ?, ?);
`;

export const COUNT_USER_PEDIDO = `
    SELECT usuario.id, usuario.nombre, usuario.email, usuario.rol, 
    COUNT(pedido.id) as totalPedidos
    FROM usuario
    LEFT JOIN pedido ON usuario.id = pedido.id_usuario
    GROUP BY usuario.id, usuario.nombre, usuario.email, usuario.rol;
`;

export const UPDATE_USER = `
    UPDATE usuario SET nombre = ?, email = ?, rol = ? WHERE id = ?;
`;

export const UPDATE_PASSWORD = `
    UPDATE usuario SET password = ? WHERE id = ?;
`;

export const EXISTS_USER = `
    SELECT 1 FROM usuario WHERE email = ? LIMIT 1;
`;

export const DELETE_USER = `
    DELETE FROM usuario WHERE id = ?;
`;