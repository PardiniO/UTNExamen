export const ADD_PROD_TO_PEDIDO = `
    INSERT INTO pedido_producto (id_pedido, id_producto, cantidad, precio_unitario)
    VALUES (?, ?, ?, ?);
`;

export const GET_PROD_BY_PEDIDO = `
    SELECT pedido_producto.id, pedido_producto.cantidad, pedido_producto.precio_unitario,
        producto.id AS producto_id, producto.nombre AS producto_nombre, 
        producto.stock AS producto_stock
    FROM pedido_producto
    JOIN producto ON pedido_producto.id_producto = producto.id
    WHERE pedido_producto.id_pedido = ?;
`;

export const GET_PEDIDOS_WITH_PROD = `
    SELECT pedido.id AS pedido_id, pedido.fecha_pedido, pedido.estado,
        usuario.id AS usuario_id, usuario.nombre AS usuario_nombre,
        producto.id AS producto_id, producto.nombre AS producto_nombre,
        pedido_producto.cantidad, pedido_producto.precio_unitario,
        (pedido_producto.cantidad * pedido_producto.precio_unitario) AS subtotal
    FROM pedido
    JOIN usuario ON pedido.id_usuario = usuario.id
    JOIN pedido_producto ON pedido.id = pedido_producto.id_pedido
    JOIN producto ON pedido_producto.id_producto = producto.id
    ORDER BY pedido.id;
`;