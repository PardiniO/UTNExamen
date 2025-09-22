import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import pedidoRoutes from "./routes/pedidoRoutes";

const app: Application = express();
app.use(express.json());

app.use('/usuarios', userRoutes);
app.use('/productos', productRoutes);
app.use('/pedidos', pedidoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));