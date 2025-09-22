import { ResultSetHeader, RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import { pool } from "../config/db";
import { IUsuario } from "../interfaces/userInterface";
import * as userQuery from "../queries/userQueries";
import * as userTable from "../tables/userTable";

export class UsuarioModel {
    static async create(usuario: IUsuario): Promise<number> {
        try {
            const { nombre, email, contraseña, rol } = usuario;
            if (!nombre || !email || !contraseña) {
                throw new Error("Todos los campos son obligatorios");
            }
            const [result] = await pool.query<ResultSetHeader>(
                userTable.USER_TABLE, 
                [nombre, email, contraseña, rol]
            );
            return result.insertId;
            
        } catch (error) {
            throw error;
        }
    }

    static async findAll(): Promise<IUsuario[]>{
        try {
            const [rows] = await pool.query<RowDataPacket[]>(userQuery.SELECT_ALL_USERS);
            return rows as IUsuario[];
        } catch (error) {
            throw error;
        }
    }

    static async findById(id: number): Promise<IUsuario | null>{
        try {
            const [rows] = await pool.query<RowDataPacket[]>(
                userQuery.SELECT_USER_BY_ID, [id]
            );
            return rows.length > 0 ? (rows[0] as IUsuario): null;
            
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email: string): Promise<IUsuario | null> {
        try {
            const [rows] = await pool.query<RowDataPacket[]>(
                userQuery.SELECT_USER_BY_EMAIL, [email]
            );
            return rows.length > 0 ? (rows[0] as IUsuario): null;
        } catch (error) {
            throw error;
        }
    }

    static async findByRol(rol: string): Promise<IUsuario[]>{
        try {
            const [rows] = await pool.query<RowDataPacket[]>(
                userQuery.SELECT_USER_BY_ROLE, [rol]
            );
            return rows as IUsuario[];
        } catch (error) {
            throw error;
        }
    }

    static async update(id: number, usuario: IUsuario): Promise<boolean> {
        try {
            const { nombre, email, rol } = usuario;
            if (!nombre || !email || !rol){
                throw new Error("Todos los campos son requeridos para actualizar");
            }
            const [result] = await pool.query<ResultSetHeader>(
                userQuery.UPDATE_USER, [nombre, email, rol, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async updatePass(id: number, newPass: string): Promise<boolean> {
        try {
            if (!newPass) {
                throw new Error("Coloque una nueva contraseña para poder cambiarla");
            }
            const hash = await bcrypt.hash(newPass, 10);
            const [result] = await pool.query<ResultSetHeader>(
                userQuery.UPDATE_PASSWORD, [hash, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
    
    static async count(): Promise<number> {
        try {
            const [rows] = await pool.query<RowDataPacket[]>(
                userQuery.COUNT_USER
            );
            return rows[0].total as number;
        } catch (error) {
            throw error;
        }
    }

    static async exists(email: string): Promise<boolean> {
        try {
            const [rows] = await pool.query(
                userQuery.EXISTS_USER, [email]
            );
            return (rows as IUsuario[]).length > 0;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id: number): Promise<boolean> {
        try {
            const [rows] = await pool.query<ResultSetHeader>(
                userQuery.DELETE_USER, [id]
            );
            return rows.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}