import { pool2 } from '../db.js';

export const Estadodecontrato = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT 
          c.IDContrato,
          c.IDCliente,
          s.IDServicio_AT AS servicioID,
          c.Cantidad_Beneficiarios AS Cant_Beneficiarios,
          c.IDAgente_co AS IDAgente,
          c.Cuotas,
          c.Estado,
          cl.Nombre,
          cl.Apellido
        FROM 
          dimension_contrato c
          INNER JOIN dimension_cliente cl ON c.IDCliente = cl.IDCliente
          INNER JOIN dimension_servicio_at s ON c.IDServicio_AT = s.IDServicio_AT
        ORDER BY 
          c.IDContrato;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de contratos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de contratos.',
      error: error.message,
    });
  }
};