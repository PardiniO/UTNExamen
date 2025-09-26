import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        res.status(400).json({ errors: errores.array() });
        return;
    }
    next();
}

export const validateRegister = [
    body('nombre')
        .notEmpty().withMessage('Nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('email')
        .notEmpty().withMessage('Email es obligatorio')
        .isEmail().withMessage('Formato de email inválido'),
    body('password')
        .notEmpty().withMessage('Contraseña es obligatiora')
        .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres'),
    handleValidationErrors
];

export const validateLogin = [
    body('email')
        .notEmpty().withMessage('Email es obligatorio')
        .isEmail().withMessage('Formato de email inválido'),
    body('password')
        .notEmpty().withMessage('Contrseña es obligatoria'),
    handleValidationErrors
];