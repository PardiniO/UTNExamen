import { IProducto } from "../interfaces/productInterface";
import { ProductoModel } from "../models/productModel";

export async function create(datos: IProducto) {
    return ProductoModel.create(datos);
}

export async function findAll() {
    return ProductoModel.findAll();
}

export async function findById(id: number) {
    return ProductoModel.findById(id);
}

export async function update(datos: IProducto) {
    return ProductoModel.update(datos);
}

export async function eliminar(id: number) {
    return ProductoModel.delete(id);
}