import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/db";
import { IPedidoProducto } from "../interfaces/pedidoProdInterface";
import * as queries from "../queries/pedidoProdQueries";

export class PedidoProductoModel {
    static async addProductToPedido(datos: IPedidoProducto): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>(
            queries.ADD_PROD_TO_PEDIDO, 
            [datos.id_pedido, datos.id_producto, datos.cantidad, datos.precio_unitario]
        );
        return result.insertId;
    } 

    static async getProductsByPedido(id_pedido: number): Promise<IPedidoProducto[]> {
        const [rows] = await pool.query<RowDataPacket[]>(queries.GET_PROD_BY_PEDIDO, [id_pedido]);
        return rows as IPedidoProducto[];
    }

    static async getPedidosWithProducts(): Promise<IPedidoProducto[]> {
        const [rows] = await pool.query<RowDataPacket[]>(queries.GET_PEDIDOS_WITH_PROD);
        return rows as IPedidoProducto[];
    }
}