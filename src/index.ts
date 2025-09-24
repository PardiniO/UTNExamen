import express, { Application } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import pedidoRoutes from "./routes/pedidoRoutes";
import pedidoProductoRoutes from "./routes/pedidoProdRoutes";
import { initTables } from "./models/initTablesModel";

dotenv.config();

const app: Application = express();
app.use(express.json());


app.use('/usuarios', userRoutes);
app.use('/productos', productRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/pedido-productos', pedidoProductoRoutes);

const PORT = Number(process.env.PORT) || 3000;

(async () => {
    try {
        await initTables();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error al inicializar la app', err);
        process.exit(1);
    }
})();