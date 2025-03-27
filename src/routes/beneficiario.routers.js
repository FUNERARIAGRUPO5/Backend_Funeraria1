import { Router } from 'express';
import { obtenerBeneficiarios, obtenerBeneficiario } from '../controllers/beneficiario.controller.js';

const router = Router();

// Ruta para obtener todos los contratos
router.get('/Beneficiarios', obtenerBeneficiarios);

// Ruta para obtener un contrato por su ID
router.get('/Beneficiarios/:id', obtenerBeneficiario);

export default router;