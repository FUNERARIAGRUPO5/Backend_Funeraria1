import { Router } from 'express';
import { obtenerContratos, obtenerContrato } from '../controllers/contratos.controller.js';

const router = Router();

// Ruta para obtener todos los contratos
router.get('/Contrato', obtenerContratos);

// Ruta para obtener un contrato por su ID
router.get('/Contrato/:id', obtenerContrato);

export default router;