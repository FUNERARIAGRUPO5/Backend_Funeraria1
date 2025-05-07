import express from 'express';
import cors from 'cors';
import rutasCliente from './routes/cliente.routers.js'
import rutasUsuarios from './routes/usuarios.routes.js';
import rutasBeneficiario from './routes/beneficiario.routers.js';
import rutasAgente from './routes/agente.routers.js';
import rutasContratos from './routes/contratos.routes.js';
import rutasModelos from './routes/modelo.routers.js';
import rutasFacturas from './routes/factura.routers.js';
import routerservicios from './routes/servicio_at.routes.js';

const app = express();

// Habilitar CORS para cualquier origen
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use('/api', rutasCliente);
app.use('/api', rutasUsuarios);
app.use('/api', rutasBeneficiario);
app.use('/api', rutasAgente);
app.use('/api', rutasContratos);
app.use('/api', rutasModelos);
app.use('/api', rutasFacturas);
app.use('/api', routerservicios);


// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
    message: 'La ruta que ha especificado no se encuentra registrada.'
    });
});

export default app;