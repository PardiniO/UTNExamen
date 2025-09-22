import { Router } from "express";
import * as pedidoProdController from "../controllers/pedidoProdController";
import { authGuard, roleGuard } from "../middlewares/guardMiddleware";

const router = Router();

router.post('/', authGuard, roleGuard('user', 'admin', 'superAdmin'), pedidoProdController.addProductToPedido);

router.get('/:id_pedido', authGuard, pedidoProdController.getProductsByPedido);

router.get('/', authGuard, roleGuard('admin', 'superAdmin'), pedidoProdController.getPedidosWithProducts);

export default router;