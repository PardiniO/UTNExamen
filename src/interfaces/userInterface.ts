export interface IUsuario {
    id?: number;
    nombre: string;
    email: string;
    password: string;
    rol?: 'user' | 'admin' | 'superAdmin';
    fechaCreacion?: Date;
}