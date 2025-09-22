import { Request, Response } from "express";
import * as UsuarioService from "../services/usuarioService";
import { IUsuarioInput } from "../interfaces/userIterface";
import { IRespuestaAPI } from "../interfaces/resAPIInterface";
import * as jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
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
        } as IUsuarioInput);
        const userCreated = await UsuarioService.listarPorId(insertId);
        
        if (typeof userCreated === 'number') {
            const newUser = await UsuarioService.listarPorId(userCreated);

            if (!newUser) {
                const respuesta: IRespuestaAPI<null> = { success: false, message: 'Error al recuperar usuario creado' };
                res.status(500).json(respuesta);
                return;
            }
            const respuesta: IRespuestaAPI<IUsuarioInput> = {
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
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al crear usuario';
        const respuesta: IRespuestaAPI<null> = { success: false, message };
        return res.status(500).json(respuesta);
    }
}

export async function login(req: Request, res: Response) {
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
        const message = err instanceof Error ? err.message : 'Error desconocido';
        const respuesta: IRespuestaAPI<null> = { success: false, message };
        res.status(500).json(respuesta);
        return;
    }
}

export async function getUsers(_req: Request, res: Response) {
    try {
        const users = await UsuarioService.listarTodos();
        res.status(200).json(users);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        const respuesta: IRespuestaAPI<null> = { success: false, message };
        res.status(500).json(respuesta);
        return;
    }
}

export async function getById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const users = await UsuarioService.listarPorId(Number(id));

        if (!users) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        res.json(users);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        const respuesta: IRespuestaAPI<null> = { success: false, message };
        res.status(500).json(respuesta);
    }
}

export async function getByEmail(req: Request, res: Response) {
    try {
        const { email } = req.params;
        const users = await UsuarioService.listarPorEmail(email);
    
        if (!users) {
            res.status(404).json({ error: 'Email no encontrado' });
            return;
        }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        const respuesta: IRespuestaAPI<null> = { success: false, message };
        res.status(500).json(respuesta);
    }
}

export async function getByRole(req: Request, res: Response) {
    try {
        const { rol } = req.params;
        const users = await UsuarioService.listarPorRol(rol);
        res.json(users);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        const respuesta: IRespuestaAPI<null> = { success: false, message };
        res.status(500).json(respuesta);
    }
}

export async function updateUser(req: Request, res: Response) {
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
        const message = err instanceof Error ? err.message : 'Error desconocido';
        const respuesta: IRespuestaAPI<null> = { success: false, message };
        res.status(500).json(respuesta);
    }
}

export async function updatePass(req: Request, res: Response) {
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
        const message = err instanceof Error ? err.message : 'Error desconocido';
        const respuesta: IRespuestaAPI<null> = { success: false, message };
        res.status(500).json(respuesta);
    }
}

export async function countUsers(_req: Request, res: Response) {
    try {
        const total = await UsuarioService.count();
        res.json({ total });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        const respuesta: IRespuestaAPI<null> = { success: false, message };
        res.status(500).json(respuesta);
    }
}

export async function existUser(req: Request, res: Response) {
    try {
        const { email } = req.params;
        const existe = await UsuarioService.existe(email);
        res.json({ existe });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        const respuesta: IRespuestaAPI<null> = { success: false, message };
        res.status(500).json(respuesta);
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        
        const eliminado = await UsuarioService.eliminar(Number(id));
        if (!eliminado) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        const respuesta: IRespuestaAPI<null> = { success: false, message };
        res.status(500).json(respuesta);
    }
}