import { Router } from "express";
import * as pedidoProdController from "../controllers/pedidoProdController";
import { authGuard, roleGuard } from "../middlewares/guardMiddleware";

const router = Router();

router.post('/', authGuard, roleGuard('user', 'admin', 'superAdmin'), pedidoProdController.addProductToPedido);

router.get('/pedidos-con-productos', authGuard, roleGuard('admin', 'superAdmin'), pedidoProdController.getPedidosWithProducts);
router.get('/:id_pedido', authGuard, pedidoProdController.getProductsByPedido);

export default router;