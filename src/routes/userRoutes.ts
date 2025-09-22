import { Router } from "express";
import * as userController from "../controllers/userController";
import { authGuard, roleGuard } from "../middlewares/guardMiddleware";
import { validateLogin, validateRegister } from "../middlewares/validateMiddleware";

const router = Router();

router.post('/registrar', validateRegister, userController.register);
router.post('/login', validateLogin, userController.login);

router.post('/', authGuard, roleGuard('superAdmin'), validateRegister, userController.register);

router.delete('/:id', authGuard, roleGuard('superAdmin'), userController.deleteUser);

router.get('/', authGuard, roleGuard('superAdmin', 'admin'), userController.getUsers);

export default router;