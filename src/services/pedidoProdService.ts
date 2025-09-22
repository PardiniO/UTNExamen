import { IPedidoProducto } from "../interfaces/pedidoProdInterface";
import { PedidoProductoModel } from "../models/pedidoProdModel";

export async function addProductToPedido(datos: IPedidoProducto) {
    return PedidoProductoModel.addProductToPedido(datos);
}

export async function getProductsByPedido(id_pedido: number) {
    return PedidoProductoModel.getProductsByPedido(id_pedido);
}

export async function getPedidosWithProducts() {
    return PedidoProductoModel.getPedidosWithProducts();
}