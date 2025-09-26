import { IPedidoProducto } from "../interfaces/pedidoProdInterface";
import { PedidoProductoModel } from "../models/pedidoProdModel";

export async function addProductToPedido(datos: IPedidoProducto) {
    try {
        return await PedidoProductoModel.addProductToPedido(datos);
    } catch (err) {
        throw new Error(`Error al agregar producto al pedido: ${(err as Error).message}`);
    }
}

export async function getProductsByPedido(id_pedido: number) {
    try {
        return await PedidoProductoModel.getProductsByPedido(id_pedido);
    } catch (err) {
        throw new Error(`Error al obtener productos por pedido: ${(err as Error).message}`);
    }
}

export async function getPedidosWithProducts() {
    try {
        return await PedidoProductoModel.getPedidosWithProducts();
    } catch (err) {
        throw new Error(`Error al obtener pedido con productos: ${(err as Error).message}`);
    }
}