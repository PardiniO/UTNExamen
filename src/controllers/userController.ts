import { NextFunction, Request, Response } from "express";
import * as UsuarioService from "../services/usuarioService";
import { IUsuario } from "../interfaces/userInterface";
import { IRespuestaAPI } from "../interfaces/resAPIInterface";
import * as jwt from "jsonwebtoken";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { nombre, email, password, rol } = req.body;
        
        if (!nombre || !email || !password){
            const respuesta: IRespuestaAPI<null> = {
                success: false,
                message: 'Todos los campos son obligatorios'
            };
            res.status(400).json(respuesta);
            return;
        }
        
        const insertId = await UsuarioService.registrar({
            nombre, 
            email, 
            password, 
            rol: rol || 'user'
        } as IUsuario);

        const newUser = await UsuarioService.listarPorId(insertId);
        
        if (!newUser) {
            const respuesta: IRespuestaAPI<null> = {
                success: false,
                message: 'Error al recuperar usuario creado'
            };
            res.status(500).json(respuesta);
            return;
        }
        
        res.status(201).json({
            success: true,
            message: 'Usuario creado correctamente',
            data: newUser
        });
    } catch (err) {
        next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email y contraseña son obligatorios' });
            return;
        }

        const user = await UsuarioService.login(email, password);
        
        const payload: jwt.JwtPayload = {
            id: user.id,
            email: user.email,
            rol: user.rol
        };

        const secret: jwt.Secret = process.env.JWT_SECRET ?? 'default_secreto_examen';
        const expiresIn = process.env.JWT_EXPIRES ?? '1h';
        const options: jwt.SignOptions = { expiresIn };

        const token = jwt.sign(payload , secret, options);

        res.json({ message: 'Inicio de sesión exitoso',payload, token });
    } catch (err: unknown) {
        next(err);
    }
}

export async function getUsers(_req: Request, res: Response, next: NextFunction) {
    try {
        const users = await UsuarioService.listarTodos();
        res.status(200).json(users);
    } catch (err: unknown) {
        next(err);
    }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const users = await UsuarioService.listarPorId(Number(id));

        if (!users) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        res.json(users);
    } catch (err: unknown) {
        next(err);
    }
}

export async function getByEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.params;
        const users = await UsuarioService.listarPorEmail(email);
    
        if (!users) {
            res.status(404).json({ error: 'Email no encontrado' });
            return;
        }

        res.json(users);
    } catch (err: unknown) {
        next(err);
    }
}

export async function getByRole(req: Request, res: Response, next: NextFunction) {
    try {
        const { rol } = req.params;
        const users = await UsuarioService.listarPorRol(rol);
        res.json(users);
    } catch (err: unknown) {
        next(err);
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const { nombre, email, rol } = req.body;

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID inválido' });
        }

        if (!nombre || !email || !rol) {
            res.status(400).json({ error: 'Nombre y rol son obligatorios' });
            return;
        }

        const actualizado = await UsuarioService.actualizar(id, nombre, email, rol);
        if (!actualizado) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        const userUpdated = await UsuarioService.listarPorId(Number(id));
        res.json({ message: `Usuario actualizado correctamente`, data: userUpdated });
    } catch (err: unknown) {
        next(err);
    }
}

export async function updatePass(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if (!password) {
            res.status(400).json({ error: 'Coloque la nueva contraseña' });
            return;
        }

        const actualizado = await UsuarioService.actualizarContra(Number(id), password);
        if (!actualizado) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (err: unknown) {
        next(err);
    }
}

export async function getWithPedidos(_req: Request, res: Response, next: NextFunction) {
    try {
        const usuarios = await UsuarioService.listarConPedidos();
        res.json({ data: usuarios });
    } catch (err: unknown) {
        next(err);
    }
}

export async function existUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.params;
        const existe = await UsuarioService.existe(email);
        res.json({ existe });
    } catch (err: unknown) {
        next(err);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        
        const eliminado = await UsuarioService.eliminar(Number(id));
        if (!eliminado) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (err: unknown) {
        next(err);
    }
}