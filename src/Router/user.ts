import { Router } from 'express';
import * as UserController from '../Controller/UserController';
const router = Router();

router.post("/user/adicionar", UserController.addUser)

export default router