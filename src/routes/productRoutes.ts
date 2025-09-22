import { Router } from "express";
import * as productController from "../controllers/productController";
import { authGuard, roleGuard } from "../middlewares/guardMiddleware";
import { validateLogin } from "../middlewares/validateMiddleware";

const router = Router();

router.get('/', authGuard, productController.getAllPoducts);
router.get('/:id', authGuard, productController.getProdById);

router.post('/', authGuard, roleGuard('admin', 'superAdmin'),validateLogin, productController.createProduct);
router.put('/:id', authGuard, roleGuard('admin', 'superAdmin'),validateLogin, productController.updateProduct);
router.delete('/:id', authGuard, roleGuard('admin', 'superAdmin'),validateLogin, productController.deleteProduct);

export default router;