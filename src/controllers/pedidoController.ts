import { Request, Response } from "express";
import * as pedidoService from "../services/pedidoService";
import { IRespuestaAPI } from "../interfaces/resAPIInterface";

export async function createPedido(req: Request, res: Response) {
    try {
        const { id_usuario, fecha_pedido, estado } = req.body;
        if (!id_usuario || fecha_pedido === undefined){
            const respuesta: IRespuestaAPI<null> = { success: false, message: 'Faltan campos requeridos' };
            res.status(400).json(respuesta);
            return;
        }
        const pedido = await pedidoService.create({ id_usuario, fecha_pedido, estado });
        const respuesta: IRespuestaAPI<number> = { success: true, data: pedido, message: 'Pedido creado correctamente' };
        res.status(201).json(respuesta);
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
        res.status(200).json({ success: true, message: pedido });
    } catch (err: unknown) {
        res.status(400).json({ success: false, message: err });
    }
}

export async function updatePedido(req: Request, res: Response) {
    try {
        await pedidoService.update({ id: Number(req.params.id), ...req.body });
        res.status(200).json({ success: true, message: 'Pedido actualizado' });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        res.status(400).json({ success: false, message });
    }
}

export async function deletePedido(req: Request, res: Response) {
    try {
        await pedidoService.eliminar(Number(req.params.id));
        res.status(200).json({ success: true, message: 'Pedido eliminado correctamente' });
    } catch (err: unknown) {
        res.status(400).json({ success: false, message: err });
    }
}