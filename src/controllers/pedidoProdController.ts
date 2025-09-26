import { Request, Response } from "express";
import * as pedidoProdService from "../services/pedidoProdService";

export async function addProductToPedido(req: Request, res: Response) {
    try {
        const nuevo = await pedidoProdService.addProductToPedido(req.body);
        res.status(201).json({ success: true, data: nuevo });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        res.status(400).json({ success: false, message });
    }
}

export async function getProductsByPedido(req: Request, res: Response) {
    try {
        const id_pedido = Number(req.params.id_pedido);
        if (isNaN(id_pedido)) {
            res.status(400).json({ success: false, message: 'id_pedido inválido' });
            return;
        }
        const productos = await pedidoProdService.getProductsByPedido(Number(id_pedido));
        res.status(200).json({ success: true, data: productos });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        res.status(400).json({ success: false, message });
    }
}

export async function getPedidosWithProducts(_req: Request, res: Response) {
    try {
        const pedidos = await pedidoProdService.getPedidosWithProducts();
        res.status(200).json({ success: true, data: pedidos });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        res.status(400).json({ success: false, message });
    }
}