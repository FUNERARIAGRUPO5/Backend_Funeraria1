import { Router } from 'express';
import { obtenerClientes, obtenerCliente } from '../controllers/cliente.controller.js';

const router = Router();

// Ruta para obtener todos los contratos
router.get('/Cliente', obtenerClientes);

// Ruta para obtener un contrato por su ID
router.get('/Clientes/:id', obtenerCliente);

export default router;