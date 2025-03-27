import { Router } from 'express';
import { obtenerModelos, obtenerModelo } from '../controllers/modelo.controller.js';

const router = Router();

// Ruta para obtener todos los Modelos
router.get('/Modelo', obtenerModelos);

// Ruta para obtener un modelo por su ID
router.get('/Modelo/:id', obtenerModelo);

export default router;