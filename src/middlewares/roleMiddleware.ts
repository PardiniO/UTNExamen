import { Request, Response, NextFunction } from "express";
import { IAuthenticatedReq } from "../interfaces/jwtPayloadInterface";

export function authorizeRoles(...roles: ('user' | 'admin' | 'superAdmin')[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as unknown as IAuthenticatedReq).user;

        if (!user) {
            res.status(401).json({ erorr: 'No autenticado' });
            return;
        }

        if (!roles.includes(user.rol)) {
            res.status(403).json({ error: 'No tienes permisos para esta acción' });
            return;
        }

        next();
    };
}