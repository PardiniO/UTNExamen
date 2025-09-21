const BASE_SELECT_USER = `
    SELECT id, nombre, email, rol, fecha_creacion
    FROM usuario
`;

export const SELECT_ALL_USERS = BASE_SELECT_USER;

export const SELECT_USER_BY_ID = BASE_SELECT_USER + `WHERE id = ?`;

export const SELECT_USER_BY_EMAIL = BASE_SELECT_USER + `WHERE email = ?`;

export const SELECT_USER_BY_ROLE = BASE_SELECT_USER + `WHERE rol = ?`;

export const INSERT_USER = `
    INSER INTO usuario (nombre, email, contraseña, rol)
    VALUES (?, ?, ?, ?)
`;

export const COUNT_USER = `
    SELECT COUNT(*) as total
    FROM usuario
`;

export const UPDATE_USER = `
    UPDATE usuario SET nombre = ?, rol = ?, WHERE id = ?
`;

export const UPDATE_PASSWORD = `
    UPDATE usuario SET contraseña = ? WHERE id = ?
`;

export const EXISTS_USER = `
    SELECT 1 FROM usuario WHERE email = ? LIMIT 1
`;

export const DELETE_USER = `
    DELETE FROM usuario WHERE id = ?
`;