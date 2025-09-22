import { IPedido } from "../interfaces/pedidoInterface";
import { PedidoModel } from "../models/pedidoModel";

export async function create(datos: IPedido) {
    return PedidoModel.create(datos);
}

export async function findAll() {
    return PedidoModel.findAll();
}

export async function findById(id: number) {
    return PedidoModel.findById(id);
}

export async function update(datos: IPedido) {
    return PedidoModel.update(datos);
}

export async function eliminar(id: number) {
    return PedidoModel.delete(id);
}