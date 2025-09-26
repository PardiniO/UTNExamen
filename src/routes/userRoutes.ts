import { Router } from "express";
import * as userController from "../controllers/userController";
import { authGuard, roleGuard } from "../middlewares/guardMiddleware";
import { validateLogin, validateRegister } from "../middlewares/validateMiddleware";

const router = Router();

router.post('/registrar', validateRegister, userController.register);
router.post('/login', validateLogin, userController.login);

router.post('/', authGuard, roleGuard('superAdmin'), validateRegister, userController.register);

router.get('/', authGuard, roleGuard('superAdmin', 'admin'), userController.getUsers);
router.get('/usuarios-pedidos', authGuard, roleGuard('superAdmin', 'admin'), userController.getWithPedidos);
router.get('/email/:email', authGuard, roleGuard('superAdmin', 'admin'), userController.getByEmail);
router.get('/id/:id', authGuard, roleGuard('superAdmin', 'admin'), userController.getById);
router.get('/rol/:rol', authGuard, roleGuard('superAdmin', 'admin'), userController.getByRole);

router.put('/:id', authGuard, roleGuard('superAdmin', 'admin'), userController.updateUser);
router.put('/:id/password', authGuard, roleGuard('superAdmin', 'admin', 'user'), userController.updatePass);

router.delete('/:id', authGuard, roleGuard('superAdmin'), userController.deleteUser);

export default router;