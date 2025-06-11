import { Router } from 'express';
import { ContratosPorEstadoYAgente } from '../controllers/estadisticas.controller.js';

const router = Router();
router.get('/estadodecontrato', ContratosPorEstadoYAgente);

export default router;