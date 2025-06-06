import { Router } from 'express';
import {Estadodecontrato} from '../controllers/estadisticas.controller.js'

const router = Router();
router.get('/estadodecontrato', Estadodecontrato);

export default router;