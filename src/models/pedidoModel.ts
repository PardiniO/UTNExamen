import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/db";
import { IPedido } from "../interfaces/pedidoInterface";
import * as pedidoQueries from "../queries/pedidoQueries";
import * as pedidoTable from "../tables/pedidoTable";

export class PedidoModel {
    static async create(datos: IPedido): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>(pedidoTable.PEDIDO_TABLE, [datos]);
        return result.insertId;
    };

    static async findAll(): Promise<IPedido[]> {
        const [rows] = await pool.query<RowDataPacket[]>(pedidoQueries.GET_ALL_PEDIDOS);
        return rows as IPedido[];
    }

    static async findById(id: number): Promise<IPedido | null> {
        const [rows] = await pool.query<RowDataPacket[]>(pedidoQueries.GET_PEDIDO_BY_ID, [id]);
        return rows.length > 0 ? (rows[0] as IPedido): null;
    }

    static async update(datos: IPedido): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(pedidoQueries.UPDATE_PEDIDO, [datos]);
        return result.affectedRows > 0;
    }

    static async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(pedidoQueries.DELETE_PEDIDO, [id]);
        return result.affectedRows > 0;
    }
}