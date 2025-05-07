import { Router } from 'express';
import { obtenerBeneficiarios, registrarBeneficiarios, eliminarBeneficiario, actualizarBeneficiario } from '../controllers/beneficiario.controller.js';

const router = Router();

// Ruta para obtener todos los contratos
router.get('/Beneficiarios', obtenerBeneficiarios);

// Ruta para obtener un contrato por su ID
router.post('/registrarbeneficiario', registrarBeneficiarios);

// Ruta para eliminar un cliente por su ID
router.delete('/eliminarbeneficiario/:id', eliminarBeneficiario);

// Ruta para actualizar un cliente por su ID
router.patch('/actualizarbeneficiario/:id', actualizarBeneficiario);

export default router;