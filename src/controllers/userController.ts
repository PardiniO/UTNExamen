import { NextFunction, Request, Response } from "express";
import * as UsuarioService from "../services/usuarioService";
import { IUsuario } from "../interfaces/userInterface";
import { IRespuestaAPI } from "../interfaces/resAPIInterface";
import * as jwt from "jsonwebtoken";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { nombre, email, contraseña, rol } = req.body;
        
        if (!nombre || !email || !contraseña){
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
            contraseña, 
            rol: rol || 'user'
        } as IUsuario);
        const userCreated = await UsuarioService.listarPorId(insertId);
        
        if (typeof userCreated === 'number') {
            const newUser = await UsuarioService.listarPorId(userCreated);

            if (!newUser) {
                const respuesta: IRespuestaAPI<null> = { success: false, message: 'Error al recuperar usuario creado' };
                res.status(500).json(respuesta);
                return;
            }
            const respuesta: IRespuestaAPI<IUsuario> = {
                success: true,
                data: newUser,
                message: 'Usuario creado exitosamente'
            }
            res.status(201).json(respuesta);
            return;
        } else {
            const respuesta: IRespuestaAPI<null> = { success: false, message: 'Error al crear usuario' };
            res.status(500).json(respuesta);
            return;
        }
    } catch (err) {
        next(err);
    }
}

export async function login(next: NextFunction, req: Request, res: Response) {
    try {
        const { email, contraseña } = req.body;

        if (!email || !contraseña) {
            res.status(400).json({ error: 'Email y contraseña son obligatorios' });
            return;
        }

        const user = await UsuarioService.login(email, contraseña);
        
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

export async function getUsers(next: NextFunction, _req: Request, res: Response) {
    try {
        const users = await UsuarioService.listarTodos();
        res.status(200).json(users);
    } catch (err: unknown) {
        next(err);
    }
}

export async function getById(next: NextFunction, req: Request, res: Response) {
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

export async function getByEmail(next: NextFunction, req: Request, res: Response) {
    try {
        const { email } = req.params;
        const users = await UsuarioService.listarPorEmail(email);
    
        if (!users) {
            res.status(404).json({ error: 'Email no encontrado' });
            return;
        }
    } catch (err: unknown) {
        next(err);
    }
}

export async function getByRole(next: NextFunction, req: Request, res: Response) {
    try {
        const { rol } = req.params;
        const users = await UsuarioService.listarPorRol(rol);
        res.json(users);
    } catch (err: unknown) {
        next(err);
    }
}

export async function updateUser(next: NextFunction, req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { nombre, rol } = req.body;

        if (!nombre || !rol) {
            res.status(400).json({ error: 'Nombre y rol son obligatorios' });
            return;
        }

        const actualizado = await UsuarioService.actualizar(Number(id), nombre, rol);
        if (!actualizado) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const userUpdated = await UsuarioService.listarPorId(Number(id));
        res.json({ message: `Usuario: ${userUpdated} actualizado` });
    } catch (err: unknown) {
        next(err);
    }
}

export async function updatePass(next: NextFunction, req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { nuevaContraseña } = req.body;

        if (!nuevaContraseña) {
            res.status(400).json({ error: 'Coloque la nueva contraseña' });
            return;
        }

        const actualizado = await UsuarioService.actualizarContra(Number(id), nuevaContraseña);
        if (!actualizado) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (err: unknown) {
        next(err);
    }
}

export async function countUsers(next: NextFunction, _req: Request, res: Response) {
    try {
        const total = await UsuarioService.count();
        res.json({ total });
    } catch (err: unknown) {
        next(err);
    }
}

export async function existUser(next: NextFunction, req: Request, res: Response) {
    try {
        const { email } = req.params;
        const existe = await UsuarioService.existe(email);
        res.json({ existe });
    } catch (err: unknown) {
        next(err);
    }
}

export async function deleteUser(next: NextFunction, req: Request, res: Response) {
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