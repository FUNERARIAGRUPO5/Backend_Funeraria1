import { Router } from 'express';
import { obtenerContratosConDetalles, registrarContratos, eliminarContrato, actualizarContrato } from '../controllers/contratos.controller.js';

const router = Router();

// Ruta para obtener los contratos con detalles
router.get('/contratos', obtenerContratosConDetalles);


router.post('/registrarcontrato', registrarContratos);

// Ruta para eliminar un cliente por su ID
router.delete('/eliminarcontrato/:id', eliminarContrato);

// Ruta para actualizar un cliente por su ID
router.patch('/actualizarcontrato/:id', actualizarContrato);
export default router;
