import { Router } from "express";
import * as pedidoController from "../controllers/pedidoController";
import { authGuard, roleGuard } from "../middlewares/guardMiddleware";

const router = Router();

router.get('/', authGuard, pedidoController.getAllPedidos);
router.get('/:id', authGuard, pedidoController.getPedidoById);

router.post('/', authGuard, roleGuard('user', 'admin', 'superAdmin'), pedidoController.createPedido);

router.put('/:id', authGuard, roleGuard('admin', 'superAdmin'), pedidoController.updatePedido);

router.delete('/:id', authGuard, roleGuard('admin', 'superAdmin'), pedidoController.deletePedido);

export default router;