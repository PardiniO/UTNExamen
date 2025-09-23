import { pool } from "../config/db";
import * as userTable from "../tables/userTable";
import * as pedidoTable from "../tables/pedidoTable";
import * as productoTable from "../tables/productoTable";
import * as pedidoProductoTable from "../tables/pedidoProdTable";

export async function initTables() {
    try {
        await pool.query(userTable.USER_TABLE);
        await pool.query(pedidoTable.PEDIDO_TABLE);
        await pool.query(productoTable.PROD_TABLE);
        await pool.query(pedidoProductoTable.PEDIDO_PROD_TABLE);

        console.log("Tablas creadas correctamente");
    } catch (err) {
        console.log("Error creando tablas:", err);
    }
}