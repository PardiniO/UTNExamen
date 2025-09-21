import { ResultSetHeader } from "mysql2";
import bcrypt from "bcrypt";
import { pool } from "../config/db";
import { IUsuario } from "../interfaces/userIterface";
import * as userQuery from "../queries/userQueries";

export class UsuarioModel {
    static async create(usuario: IUsuario): Promise<number> {
        const { nombre, email, contraseña, rol } = usuario;
        const [result] = await pool.query<ResultSetHeader>(
            userQuery.INSERT_USER, 
            [nombre, email, contraseña, rol]
        );
        return result.insertId;
    }

    static async findAll(): Promise<IUsuario[]>{
        const [rows] = await pool.query<IUsuario[]>(userQuery.SELECT_ALL_USERS);
        return rows as IUsuario[];
    };

    static async findById(id: number): Promise<IUsuario | null>{
        const [rows] = await pool.query<IUsuario[]>(
            userQuery.SELECT_USER_BY_ID, [id]
        );
        return rows.length > 0 ? (rows[0] as IUsuario): null;
    }

    static async findByEmail(email: string): Promise<IUsuario | null> {
        const [rows] = await pool.query<IUsuario[]>(
            userQuery.SELECT_USER_BY_EMAIL, [email]
        );
        return rows.length > 0 ? (rows[0] as IUsuario): null;
    }

    static async findByRol(rol: string): Promise<IUsuario[]>{
        const [rows] = await pool.query<IUsuario[]>(
            userQuery.SELECT_USER_BY_ROLE, [rol]
        );
        return rows as IUsuario[];
    }

    static async update(id: number, usuario: IUsuario): Promise<boolean> {
        const { nombre, email, rol } = usuario;
        const [result] = await pool.query<ResultSetHeader>(
            userQuery.UPDATE_USER, [nombre, email, rol, id]
        );
        return result.affectedRows > 0;
    }

    static async updatePass(id: number, newPass: string): Promise<boolean> {
        const hash = await bcrypt.hash(newPass, 10);
        const [result] = await pool.query<ResultSetHeader>(
            userQuery.UPDATE_PASSWORD, [hash, id]
        );
        return result.affectedRows > 0;
    }

    static async count(): Promise<IUsuario[]> {
        const [rows] = await pool.query(
            userQuery.COUNT_USER
        );
        return (rows as IUsuario[])[0].total;
    }

    static async exists(email: string): Promise<boolean> {
        const [rows] = await pool.query(
            userQuery.EXISTS_USER, [email]
        );
        return (rows as IUsuario[]).length > 0;
    }

    static async delete(id: number): Promise<boolean> {
        const [rows] = await pool.query<ResultSetHeader>(
            userQuery.DELETE_USER, [id]
        );
        return rows.affectedRows > 0;
    }
}