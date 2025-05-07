import { Router } from 'express';
import { obtenerServicios, registrarServicio, eliminarServicio, actualizarServicio } from '../controllers/servicio_at.controllers.js';

const router = Router();

// Ruta para obtener todos los servicios
router.get('/servicios', obtenerServicios);

// Ruta para registrar un nuevo servicio
router.post('/registrarservicio', registrarServicio);

// Ruta para eliminar un servicio por su ID
router.delete('/eliminarservicio/:id', eliminarServicio);

// Ruta para actualizar un servicio por su ID
router.patch('/actualizarservicio/:id', actualizarServicio);

export default router;