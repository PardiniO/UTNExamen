const BASE_SELECT_USER = `
    SELECT id, nombre, email, rol, fecha_creacion
    FROM usuario
`;

export const SELECT_ALL_USERS = BASE_SELECT_USER;

export const SELECT_USER_BY_ID = BASE_SELECT_USER + `WHERE id = ?`;

export const SELECT_USER_BY_EMAIL = BASE_SELECT_USER + `WHERE email = ?`;

export const INSERT_USER = `
    INSER INTO usuario (nombre, email, contraseña, rol)
    VALUES (?, ?, ?, ?)
`;

export const UPDATE_USER = `
    UPDATE usuario SET nombre = ?, rol = ?, WHERE id = ?
`;

export const DELETE_USER = `
    DELETE FROM usuario WHERE id = ?
`;