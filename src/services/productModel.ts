import { IProducto } from "../interfaces/productInterface";
import { ProductoModel } from "../models/productModel";

export async function create(datos: IProducto) {
    return ProductoModel.create(datos.nombre, datos.precio_unitario, datos.stock);
}

export async function findAll() {
    return ProductoModel.findAll();
}

export async function findById(id: number) {
    return ProductoModel.findById(id);
}

export async function update(id: number, datos: IProducto) {
    return ProductoModel.update(id, datos.nombre, datos.precio_unitario, datos.stock);
}

export async function eliminar(id: number) {
    return ProductoModel.delete(id);
}