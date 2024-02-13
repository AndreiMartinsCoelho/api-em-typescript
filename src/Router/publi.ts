import { Router } from 'express';
import * as PubliController from "../Controller/PubliController";
const router = Router();

router.get("/publicacao/listar", PubliController.list)

export default router