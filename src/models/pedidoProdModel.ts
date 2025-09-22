import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/db";
import { IPedidoProducto } from "../interfaces/pedidoProdInterface";
import * as queries from "../queries/pedidoProdQueries";
import * as pedidoProdTable from "../tables/pedidoProdTable";

export class PedidoProductoModel {
    static async create(datos: IPedidoProducto): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>(pedidoProdTable.PEDIDO_PROD_TABLE, [datos]);
        return result.insertId;
    }
    
    static async addProductToPedido(datos: IPedidoProducto): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>(queries.ADD_PROD_TO_PEDIDO, [datos]);
        return result.insertId;
    } 

    static async getProductsByPedido(id_pedido: number): Promise<IPedidoProducto> {
        const [rows] = await pool.query<RowDataPacket[]>(queries.GET_PROD_BY_PEDIDO, [id_pedido]);
        return (rows[0] as IPedidoProducto);
    }

    static async getPedidosWithProducts(): Promise<IPedidoProducto[]> {
        const [rows] = await pool.query<RowDataPacket[]>(queries.GET_PEDIDOS_WITH_PROD);
        return rows as IPedidoProducto[];
    }
}