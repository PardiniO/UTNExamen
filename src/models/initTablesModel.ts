import { pool } from "../config/db";
import { USER_TABLE } from "../tables/userTable";
import { PEDIDO_TABLE } from "../tables/pedidoTable";
import { PROD_TABLE } from "../tables/productoTable";
import { PEDIDO_PROD_TABLE } from "../tables/pedidoProdTable";

export async function initTable() {
    try {
        await pool.query(USER_TABLE);
        await pool.query(PEDIDO_TABLE);
        await pool.query(PROD_TABLE);
        await pool.query(PEDIDO_PROD_TABLE);
        console.log("Tablas creadas correctamente");
    } catch (err) {
        console.log("Error creando tablas:", err);
        process.exit(1);
    }
}