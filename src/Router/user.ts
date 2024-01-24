import { Router } from 'express';
import * as UserController from '../Controller/UserController';
const router = Router();

router.post("/usuario/cadastro", UserController.cadastro)
router.post("/usuario/login", UserController.login)
router.put("/usuario/perfil/editar/:id", UserController.edit_perfil)

export default router