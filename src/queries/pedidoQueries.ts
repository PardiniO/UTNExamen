const BASE_SELECT_PEDIDO = `
    SELECT pedido.id, pedido.fecha_pedido, pedido.estado,
        usuario.id AS usuario_id, usuario.nombre AS usuario_nombre, usuario.email AS usuario_email
    FROM pedido
    JOIN usuario ON pedido.id_usuario = usuario.id;
`;

export const CREATE_PEDIDO = `
    INSERT INTO pedido (id_usuario, fecha_pedido, estado)
    VALUES (?, ?, ?);
`;

export const GET_ALL_PEDIDOS = BASE_SELECT_PEDIDO;

export const GET_PEDIDO_BY_ID = BASE_SELECT_PEDIDO + `
    WHERE pedido.id = ?;
`;

export const UPDATE_PEDIDO = `
    UPDATE pedido
    SET id_usuario = ?, fecha_pedido = ?, estado = ?
    WHERE id = ?
`;

export const DELETE_PEDIDO = `DELETE FROM pedido WHERE id = ?;`;