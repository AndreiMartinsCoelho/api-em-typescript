import { Router } from 'express';
import * as UserController from '../Controller/UserController';
const router = Router();

router.post("/user/register", UserController.register)
router.post("/user/login", UserController.login)

export default router