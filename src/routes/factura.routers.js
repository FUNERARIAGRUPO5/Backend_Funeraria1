import { Router } from 'express';
import { obtenerFacturas, registrarFactura } from '../controllers/factura.controller.js';

const router = Router();

// Ruta para obtener todas las facturas
router.get('/Factura', obtenerFacturas); // Ruta GET para la tabla factura

// Ruta para registrar una nueva factura
router.post('/registrarfactura', registrarFactura); // Ruta POST para registrar

export default router;
