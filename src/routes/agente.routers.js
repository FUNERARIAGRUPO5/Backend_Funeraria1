import { Router } from 'express';
import { obtenerAgentes, obtenerAgente } from '../controllers/agente.controller.js';

const router = Router();

// Ruta para obtener todos los contratos
router.get('/Agentes', obtenerAgentes);

// Ruta para obtener un contrato por su ID
router.get('/Agentes/:id', obtenerAgente);

export default router;