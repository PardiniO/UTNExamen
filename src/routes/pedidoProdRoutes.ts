import { Router } from "express";
import * as pedidoProdController from "../controllers/pedidoProdController";
import { authGuard, roleGuard } from "../middlewares/guardMiddleware";
import { validateLogin } from "../middlewares/validateMiddleware";

const router = Router();

router.post('/', authGuard, roleGuard('user', 'admin', 'superAdmin'), validateLogin, pedidoProdController.addProductToPedido);

router.get('/:id_pedido', authGuard, pedidoProdController.getProductsByPedido);

router.get('/', authGuard, roleGuard('admin', 'superAdmin'), validateLogin, pedidoProdController.getPedidosWithProducts);

export default router;