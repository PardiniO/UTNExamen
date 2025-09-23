import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/db";
import { initTables } from "./models/initTablesModel";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import pedidoRoutes from "./routes/pedidoRoutes";
import pedidoProductoRoutes from "./routes/pedidoProdRoutes";

dotenv.config();

const app: Application = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/usuarios', userRoutes);
app.use('/productos', productRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/pedido-productos', pedidoProductoRoutes);
app.use((_req: Request, res: Response) => {
    res.status(404).json({ 
        success: false, 
        message: 'Ruta no encontrada' 
    });
});

(async () => {
    try {
        await testConnection();
        await initTables();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error al inicializar la base de datos', err);
        process.exit(1);
    }
})();

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const status = typeof err === 'object' && err !== null && 'status' in err ? (err as any).status : 500;
    const message = typeof err === 'object' && err !== null && 'message' in err ? (err as any).message : 'Error interno del servidor';
    res.status(status).json({
        success: false,
        message: message
    });
});