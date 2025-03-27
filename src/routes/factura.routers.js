import { Router } from 'express';
import { obtenerFacturas, obtenerFactura } from '../controllers/factura.controller.js';

const router = Router();

// Ruta para obtener todos los contratos
router.get('/Factura', obtenerFacturas);

// Ruta para obtener un contrato por su ID
router.get('/Factura/:id', obtenerFactura);

export default router;