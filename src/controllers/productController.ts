import { Request, Response } from "express";
import * as productService from "../services/productService";
import { IRespuestaAPI } from "../interfaces/resAPIInterface";

export async function createProduct(req: Request, res: Response) {
    try {
        const { nombre, precio_unitario, stock } = req.body;
        if (!nombre || precio_unitario === undefined || stock === undefined) {
            const respuesta: IRespuestaAPI<null> = { success: false, message: 'Faltan campos requeridos' };
            res.status(400).json(respuesta);
        }
        const producto = await productService.create({ nombre, precio_unitario, stock });
        const respuesta: IRespuestaAPI<number> = { success: true, data: producto, message: 'Producto creado correctamente' };
        res.status(201).json(respuesta);
    } catch (err: unknown) {
        res.status(400).json({ succe: false, message: err });
    }
}

export async function getAllPoducts(_req: Request, res: Response) {
    try {
        const products = await productService.findAll();
        res.status(200).json({ success: true, data: products });
    } catch (err: unknown) {
        res.status(400).json({ success: false, message: err });
    }
}

export async function getProdById(req: Request, res: Response) {
    try {
        const product = await productService.findById(Number(req.params.id));
        if (!product) {
            res.status(404).json({ success: false, message: 'Producto no encontrado' });
            return;
        }

        res.status(200).json({ success: true, data: product });
    } catch (err: unknown) {
        res.status(400).json({ success: false, message: err });
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        await productService.update({ id: Number(req.params.id), ...req.body });
        res.status(200).json({ success: true, message: 'Producto actualizado' });
    } catch (err: unknown) {
        res.status(400).json({ success: false, message: err });
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        await productService.eliminar(Number(req.params.id));
        res.status(200).json({ success: true, message: 'Producto eliminado' });
    } catch (err: unknown) {
        res.status(400).json({ success: false, message: err });
    }
}