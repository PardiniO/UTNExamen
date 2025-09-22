import bcrypt from "bcrypt";
import { UsuarioModel } from "../models/userModel";
import { IUsuario, IUsuarioInput } from "../interfaces/userIterface";

export async function registrar(datos: IUsuarioInput) {
    const existe = await UsuarioModel.exists(datos.email);
    if (existe) throw new Error("Usuario ya registrado");
    
    const hash = await bcrypt.hash(datos.contraseña, 10);
    const userHash: IUsuario = {
        ...datos,
        contraseña: hash,
        rol: datos.rol || 'user'
    } as IUsuario;
    return UsuarioModel.create(userHash);
}

export async function login(email: string, contraseña: string) {
    const user = await UsuarioModel.findByEmail(email);
    if (!user) throw new Error("Credenciales inválidas");
    
    const match = await bcrypt.compare(contraseña, user.contraseña);
    if (!match) throw new Error("Credenciales inválidas");
    
    return user;
}

export async function listarTodos() {
    return UsuarioModel.findAll();
}

export async function listarPorRol(rol: string) {
    return UsuarioModel.findByRol(rol);
}

export async function listarPorId(id: number) {
    return UsuarioModel.findById(id);
}

export async function listarPorEmail(email: string) {
    return UsuarioModel.findByEmail(email);
}

export async function actualizar(id: number, nombre: string, rol: 'user' | 'admin' | 'superAdmin') {
    const usuario: IUsuario = { nombre, rol } as IUsuario;
    return UsuarioModel.update(id, usuario);
}

export async function actualizarContra(id: number, newPass: string) {
    const hash = await bcrypt.hash(newPass, 10);
    return UsuarioModel.updatePass(id, hash);
}

export async function existe(email: string) {
    return UsuarioModel.exists(email);
}

export async function count() {
    return UsuarioModel.count();
}

export async function eliminar(id: number) {
    return UsuarioModel.delete(id);
}