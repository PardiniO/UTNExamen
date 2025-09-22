import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IJwtPayload, IAuthenticatedReq } from "../interfaces/jwtPayloadInterface";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secret: jwt.Secret = process.env.JWT_SECRET || 'default_secreto_examen';

    if (!token) {
        res.status(401).json({ error: 'Acceso denegado, token requerido' });
        return;
    }

    try {
        const decoded = jwt.verify(
            token, secret
        ) as IJwtPayload;

        (req as unknown as IAuthenticatedReq).user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Token inválido o expirado' });
    }
}