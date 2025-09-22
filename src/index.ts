import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import pedidoRoutes from "./routes/pedidoRoutes";
import pedidoProductoRoutes from "./routes/pedidoProdRoutes";

const app: Application = express();
app.use(express.json());

app.use('/usuarios', userRoutes);
app.use('/productos', productRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/pedido-productos', pedidoProductoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));