import { pool } from "../config/db";
import { USER_TABLE } from "../tables/userTable";
import { PEDIDO_TABLE } from "../tables/pedidoTable";
import { PROD_TABLE } from "../tables/productoTable";
import { PEDIDO_PROD_TABLE } from "../tables/pedidoProdTable";

export async function initTables() {
    try {
        for (const query of USER_TABLE) {
            await pool.query(query);
        }
        for (const query of PEDIDO_TABLE) {
            await pool.query(query);
        }
        for (const query of PROD_TABLE) {
            await pool.query(query);
        }
        for (const query of PEDIDO_PROD_TABLE) {
            await pool.query(query);
        }
        console.log("Tablas creadas correctamente");
    } catch (err) {
        console.log("Error creando tablas:", err);
        process.exit(1);
    }
}

initTables();