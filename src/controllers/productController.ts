import { Request, Response } from "express";
import * as productService from "../services/productService";
import { IRespuestaAPI } from "../interfaces/resAPIInterface";

export async function createProduct(req: Request, res: Response) {
    try {
        const product = await productService.create(req.body);
        const respuesta: IRespuestaAPI<null> = { success: true, data: product, message: 'succes' };
        res.status(201).json(respuesta);
    } catch (err: unknown) {
        res.status(400).json({ succes: false, message: err });
    }
}

export async function getAllPoducts(_req: Request, res: Response) {
    try {
        const products = await productService.findAll();
        res.status(200).json({ success: true, data: products });
    } catch (err: unknown) {
        res.status(400).json({ succes: false, message: err });
    }
}

export async function getProdById(req: Request, res: Response) {
    try {
        const product = await productService.findById(Number(req.params.id));
        if (!product) {
            res.status(404).json({ succes: false, message: 'Producto no encontrado' });
            return;
        }
    } catch (err: unknown) {
        res.status(400).json({ succes: false, message: err });
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        await productService.update(Number(req.params.id), req.body);
        res.status(200).json({ succes: true, message: 'Producto actualizado' });
    } catch (err: unknown) {
        res.status(400).json({ succes: false, message: err });
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        await productService.eliminar(Number(req.params.id));
        res.status(200).json({ succes: true, message: 'Producto eliminado' });
    } catch (err: unknown) {
        res.status(400).json({ succes: false, message: err });
    }
}