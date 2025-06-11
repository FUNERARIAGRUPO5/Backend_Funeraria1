import { pool2 } from '../db.js';

// Nueva consulta: Análisis de contratos por estado y agente de cobro
export const ContratosPorEstadoYAgente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
          c.Estado,
          a.Nombre AS Nombre_Agente,
          COUNT(c.IDContrato) AS Total_Contratos,
          SUM(s.Monto) AS Monto_Total,
          GROUP_CONCAT(cl.Nombre, ' ', cl.Apellido) AS Clientes
       FROM 
          dimension_contrato c
          INNER JOIN dimension_cliente cl ON c.IDCliente = cl.IDCliente
          INNER JOIN dimension_servicio_at s ON c.IDServicio_AT = s.IDServicio_AT
          INNER JOIN dimension_agente_cobrado a ON c.IDAgente_co = a.IDAgente_co
       GROUP BY 
          c.Estado, a.IDAgente_co, a.Nombre
       ORDER BY 
          Total_Contratos DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron datos de contratos por estado y agente.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener los datos de contratos por estado y agente.',
      error: error.message,
    });
  }
};