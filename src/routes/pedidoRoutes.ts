import { Router } from "express";
import * as pedidoController from "../controllers/pedidoController";
import { authGuard, roleGuard } from "../middlewares/guardMiddleware";
import { validateLogin } from "../middlewares/validateMiddleware";

const router = Router();

router.get('/', authGuard, pedidoController.getAllPedidos);
router.get('/:id', authGuard, pedidoController.getPedidoById);

router.post('/', authGuard, roleGuard('admin', 'superAdmin'),validateLogin, pedidoController.createPedido);
router.put('/:id', authGuard, roleGuard('admin', 'superAdmin'),validateLogin, pedidoController.updatePedido);
router.delete('/:id', authGuard, roleGuard('admin', 'superAdmin'),validateLogin, pedidoController.deletePedido);

export default router;