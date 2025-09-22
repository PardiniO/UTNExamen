import { Request, Response } from "express";
import * as pedidoService from "../services/pedidoService";

export async function createPedido(req: Request, res: Response) {
    try {
        const pedido = await pedidoService.create(req.body);
        res.status(201).json({ success: true, data: pedido });
    } catch (err: unknown) {
        res.status(400).json({ success: false, message: err });
    }
}

export async function getAllPedidos(_req: Request, res: Response) {
    try {
        const pedidos = await pedidoService.findAll();
        res.status(200).json({ success: true, data: pedidos });
    } catch (err: unknown) {
        res.status(400).json({ success: false, message: err });
    }
}

export async function getPedidoById(req: Request, res: Response) {
    try {
        const pedido = await pedidoService.findById(Number(req.params.id));
        if (!pedido) {
            res.status(404).json({ success: false, message: 'Pedido no encontrado' });
            return;
        }
    } catch (err: unknown) {
        res.status(400).json({ success: false, message: err });
    }
}

export async function updatePedido(req: Request, res: Response) {
    try {
        await pedidoService.update({ id: Number(req.params.id), ...req.body });
        res.status(200).json({ success: true, message: 'Pedido actualizado' });
    } catch (err: unknown) {
        res.status(400).json({ success: false, message: err });
    }
}

export async function deletePedido(req: Request, res: Response) {
    try {
        await pedidoService.eliminar(Number(req.params.id));
        res.status(200).json({ succes: true, message: 'Pedido eliminado' });
    } catch (err: unknown) {
        res.status(400).json({ succes: false, message: err });
    }
}