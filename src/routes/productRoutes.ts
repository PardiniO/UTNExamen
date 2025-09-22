import { Router } from "express";
import * as productController from "../controllers/productController";
import { authGuard, roleGuard } from "../middlewares/guardMiddleware";

const router = Router();

router.get('/', authGuard, productController.getAllPoducts);
router.get('/:id', authGuard, productController.getProdById);

router.post('/', authGuard, roleGuard('admin', 'superAdmin'), productController.createProduct);
router.put('/:id', authGuard, roleGuard('admin', 'superAdmin'), productController.updateProduct);
router.delete('/:id', authGuard, roleGuard('admin', 'superAdmin'), productController.deleteProduct);

export default router;