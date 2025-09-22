import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IJwtPayload, IAuthenticatedReq } from "../interfaces/jwtPayloadInterface";

export function authGuard(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ error: 'Acceso denegado, falta token de autorizacion' });
        return;
    }
    
    const token = authHeader.split(' ')[1];
    const secret: jwt.Secret = process.env.JWT_SECRET || 'default_secreto_examen';

    try {
        const payload = jwt.verify(token, secret) as IJwtPayload;
        (req as unknown as IAuthenticatedReq).user = payload;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Token inválido o expirado' });
    }
}

export function roleGuard(...roles: ('user' | 'admin' | 'superAdmin')[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as unknown as IAuthenticatedReq).user;
        if (!user) {
            res.status(401).json({ error: 'No autenticado' });
            return;
        }

        if (!roles.includes(user.rol)) {
            res.status(403).json({ error: 'No tienes permisos para esta acción' });
            return;
        }

        next();
    };
}