import { Router } from 'express';
import { obtenerAgentes, registrarAgentes, eliminarAgente, actualizarAgente } from '../controllers/agente.controller.js';

const router = Router();

// Ruta para obtener todos los agentes
router.get('/Agentes', obtenerAgentes);

// Ruta para registrar un agente
router.post('/registraragentes', registrarAgentes);

// Ruta para eliminar un cliente por su ID
router.delete('/eliminaragente/:id', eliminarAgente);

// Ruta para actualizar un cliente por su ID
router.patch('/actualizaragente/:id', actualizarAgente);

export default router;
