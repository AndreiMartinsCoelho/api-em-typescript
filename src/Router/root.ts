import { Router } from 'express'
const router = Router();

router.get('/', async (req, res, next) => {
    res.json({ msg: 'Porta 3000 padrão da aplicação' })
})

export default router