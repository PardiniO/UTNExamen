import bcrypt from "bcrypt";
import { UsuarioModel } from "../models/userModel";
import { IUsuario } from "../interfaces/userInterface";

function validarUsuario(datos: IUsuario) {
    if (!datos.nombre || typeof datos.nombre !== "string" || datos.nombre.length < 2) {
        throw new Error("Nombre inválido");
    }
    if (!datos.email || typeof datos.email !== "string" || !datos.email.includes("@")) {
        throw new Error("Email inválido");
    }
    if (!datos.password || typeof datos.password !== "string" || datos.password.length < 6) {
        throw new Error("Contraseña inválida (mínimo 6 caracteres)");
    }
}

export async function registrar(datos: IUsuario) {
    try {
        validarUsuario(datos);
        const existe = await UsuarioModel.exists(datos.email);
        if (existe) throw new Error("Usuario ya registrado");
        
        const hash = await bcrypt.hash(datos.password, 10);
        const userHash: IUsuario = {
            ...datos,
            password: hash,
            rol: datos.rol || 'user'
        } as IUsuario;
        return UsuarioModel.create(userHash);
    } catch (error) {
        throw error;
    }
}

export async function login(email: string, password: string) {
    try {
        if (!email || !password) throw new Error("Email y contraseña requeridos");
        
        const user = await UsuarioModel.findByEmail(email);
        if (!user) throw new Error("Credenciales inválidas");
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Credenciales inválidas");
        
        return user;
    } catch (error) {
        throw error;
    }
}

export async function listarTodos() {
    try {
        return UsuarioModel.findAll();
    } catch (error) {
        throw error;
    }
}

export async function listarPorRol(rol: string) {
    try {
        if (!rol) throw new Error("Rol requerido");
        return UsuarioModel.findByRol(rol);
    } catch (error) {
        throw error;
    }
}

export async function listarPorId(id: number) {
    try {
        if (!id || typeof id !== 'number') throw new Error("ID inválido");
        return UsuarioModel.findById(id);
    } catch (error) {
        throw error;
    }
}

export async function listarPorEmail(email: string) {
    try {
        if (!email || typeof email !== 'string') throw new Error("Email inválido");
        return UsuarioModel.findByEmail(email);
    } catch (error) {
        throw error;
    }
}

export async function actualizar(id: number, nombre: string, rol: 'user' | 'admin' | 'superAdmin') {
    try {
        if (!id || typeof id !== 'number')throw new Error("ID inválido");
        if (!nombre || typeof nombre !== 'string' || nombre.length < 2) throw new Error("Nombre inválido");
        if (!rol) throw new Error("Rol requerido");
        const usuario: IUsuario = { nombre, rol } as IUsuario;
        return UsuarioModel.update(id, usuario);
    } catch (error) {
        throw error;
    }
}

export async function actualizarContra(id: number, newPass: string) {
    try {
        if (!id || typeof id !== 'number') throw new Error("ID iválido");
        if (!newPass || typeof newPass !== 'string' || newPass.length < 4) throw new Error("Contraseña inválida");
        const hash = await bcrypt.hash(newPass, 10);
        return UsuarioModel.updatePass(id, hash);
    } catch (error) {
        throw error;
    }
}

export async function existe(email: string) {
    try {
        if (!email || typeof email !== 'string') throw new Error("Email inválido");
        return UsuarioModel.exists(email);
    } catch (error) {
        throw error;
    }
}

export async function count() {
    try {
        return UsuarioModel.count();
    } catch (error) {
        throw error;
    }
}

export async function eliminar(id: number) {
    try {
        if (!id || typeof id !== 'number') throw new Error("ID inválido");
        return UsuarioModel.delete(id);
    } catch (error) {
        throw error;
    }
}