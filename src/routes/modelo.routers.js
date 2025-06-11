import { Router } from 'express';
import { obtenerModelos, registrarModelo, eliminarModelo, actualizarModelo } from '../controllers/modelo.controller.js';

const router = Router();

// Ruta para obtener todos los modelos
router.get('/modelos', obtenerModelos);

// Ruta para registrar un nuevo modelo
router.post('/modelos', registrarModelo);

// Ruta para eliminar un modelo por su ID
router.delete('/eliminarmodelos/:id', eliminarModelo);

// Ruta para actualizar un modelo por su ID
router.patch('/actualizarModelo/:id', actualizarModelo);

export default router;