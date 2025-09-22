import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/db";
import * as productQuery from "../queries/productQueries";
import { IProducto } from "../interfaces/productInterface";

export class ProductoModel {
    static async create(nombre: string, precio_unitario: number, stock: number): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>(productQuery.CREATE_PROD, [nombre, precio_unitario, stock]);
        return result.insertId;
    };

    static async findAll(): Promise<IProducto[]> {
        const [rows] = await pool.query<RowDataPacket[]>(productQuery.GET_ALL_PROD);
        return rows as IProducto[];
    };

    static async findById(id: number): Promise<IProducto | null> {
        const [rows] = await pool.query<RowDataPacket[]>(productQuery.GET_PROD_BY_ID, [id]);
        return rows.length > 0 ? (rows[0] as IProducto): null;
    };

    static async update(id: number, nombre: string, precio_unitario: number, stock: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(productQuery.UPDATE_PROD, [nombre, precio_unitario, stock, id]);
        return result.affectedRows > 0;
    };

    static async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(productQuery.DELETE_PROD, [id]);
        return result.affectedRows > 0;
    }
}