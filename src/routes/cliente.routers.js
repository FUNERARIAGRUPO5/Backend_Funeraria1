import { Router } from 'express';
import { obtenerClientes, registrarCliente, eliminarCliente, actualizarCliente } from '../controllers/cliente.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/Cliente', obtenerClientes);

// Ruta para registrar un cliente
router.post('/registrarcliente', registrarCliente);

// Ruta para eliminar un cliente por su ID
router.delete('/eliminarcliente/:id', eliminarCliente);

// Ruta para actualizar un cliente por su ID
router.patch('/actualizarcliente/:id', actualizarCliente);

export default router;