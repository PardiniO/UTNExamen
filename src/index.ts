import express, { Application } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import pedidoRoutes from "./routes/pedidoRoutes";
import pedidoProductoRoutes from "./routes/pedidoProdRoutes";

const app: Application = express();
app.use(express.json());

dotenv.config();

app.use('/usuarios', userRoutes);
app.use('/productos', productRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/pedido-productos', pedidoProductoRoutes);

import { Request, Response, NextFunction } from "express";
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500;
    res.status(status).json({
        succes: false,
        message: err.message || 'Error interno del servidor'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto http://localhost:${PORT}`));