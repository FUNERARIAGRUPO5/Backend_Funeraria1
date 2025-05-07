import { Router } from 'express';
import { obtenerModelos, registrarModelo, eliminarModelo, actualizarModelo } from '../controllers/modelo.controller.js';

const router = Router();

// Ruta para obtener todos los Modelos
router.get('/modelos', obtenerModelos);

// Ruta para obtener un modelo por su ID
router.post('/registrarmodelos', registrarModelo);

// Ruta para eliminar un cliente por su ID
router.delete('/eliminarmodelos/:id', eliminarModelo);

// Ruta para actualizar un cliente por su ID
router.patch('/actualizarmodelos/:id', actualizarModelo);


export default router;