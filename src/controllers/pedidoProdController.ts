import { Request, Response } from "express";
import * as pedidoProdService from "../services/pedidoProdService";
import { PedidoProductoModel } from "../models/pedidoProdModel";

export async function addProductToPedido(req: Request, res: Response) {
    try {
        const nuevo = await pedidoProdService.addProductToPedido(req.body);
        res.status(201).json({ success: true, data: nuevo });
    } catch (err: unknown) {
        res.status(400).json({ success: false, message: err });
    }
}

export async function getProductsByPedido(req: Request, res: Response) {
    try {
        const productos = await pedidoProdService.getProductsByPedido(Number(req.params.id_pedido));
        res.status(200).json({ success: true, data: productos });
    } catch (err: unknown) {
        res.status(400).json({ success: false, message: err });
    }
}

export async function getPedidosWithProducts(_req: Request, res: Response) {
    try {
        const pedidos = await pedidoProdService.getPedidosWithProducts();
        res.status(200).json({ success: true, data: pedidos });
    } catch (err: unknown) {
        res.status(400).json({ success: false, message: err });
    }
}