import { RowDataPacket } from "mysql2";
export interface IUsuario extends RowDataPacket{
    id?: number;
    nombre: string;
    email: string;
    contraseña: string;
    rol?: 'user' | 'admin' | 'superAdmin';
    fechaCreacion?: Date;
}

export interface IUsuarioInput {
    nombre: string;
    email: string;
    contraseña: string;
    rol?: 'user' | 'admin' | 'superAdmin';
}