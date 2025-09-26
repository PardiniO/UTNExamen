import { IProducto } from "../interfaces/productInterface";
import { ProductoModel } from "../models/productModel";

export async function create(datos: IProducto) {
    try {
        return await ProductoModel.create(datos);
    } catch (err) {
        throw new Error(`Error al crear producto: ${(err as Error).message}`);
    }
}

export async function findAll() {
    try {
        return await ProductoModel.findAll();
    } catch (err) {
        throw new Error(`Error al listar producto: ${(err as Error).message}`);
    }
}

export async function findById(id: number) {
    try {
        return await ProductoModel.findById(id);
    } catch (err) {
        throw new Error(`Error al buscar producto por ID: ${(err as Error).message}`);
    }
}

export async function update(datos: IProducto) {
    try {
        return await ProductoModel.update(datos);
    } catch (err) {
        throw new Error(`Error al actualizar producto: ${(err as Error).message}`);
    }
}

export async function eliminar(id: number) {
    try {
        return await ProductoModel.delete(id);
    } catch (err) {
        throw new Error(`Error al eliminar producto: ${(err as Error).message}`);
    }
}