import { IPedido } from "../interfaces/pedidoInterface";
import { PedidoModel } from "../models/pedidoModel";

export async function create(datos: IPedido) {
    try {
        return await PedidoModel.create(datos);
    } catch (err) {
        throw new Error(`Error al crear pedido: ${(err as Error).message}`);
    }
}

export async function findAll() {
    try {
        return await PedidoModel.findAll();
    } catch  (err) {
        throw new Error(`Error al listar pedidos: ${(err as Error).message}`);
    }
}

export async function findById(id: number) {
    try {
        return await PedidoModel.findById(id);
    } catch  (err) {
        throw new Error(`Error al buscar pedido por ID: ${(err as Error).message}`);
    }
}

export async function update(datos: IPedido) {
    try {
        return await PedidoModel.update(datos);
    } catch  (err) {
        throw new Error(`Error al actualizar pedido: ${(err as Error).message}`);
    }
}

export async function eliminar(id: number) {
    try {
        return await PedidoModel.delete(id);
    } catch  (err) {
        throw new Error(`Error al eliminar pedido: ${(err as Error).message}`);
    }
}