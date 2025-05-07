import { pool } from '../db.js';

// Obtener todos los contratos con sus detalles (sin incluir Agentes)
export const obtenerContratosConDetalles = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        c.IDContrato,
        c.Estado,
        c.Cantidad_Beneficiarios AS CantidadBeneficiarios,
        c.Cuotas,
        c.Monto,
        c.IDCliente,
        c.Fecha_inicio,
        c.Fecha_fin,
        CONCAT(cl.Nombre, ' ', cl.Apellido) AS NombreCliente
      FROM Contrato c
      INNER JOIN Cliente cl ON c.IDCliente = cl.IDCliente
    `);

    if (!result.length) {
      return res.status(404).json({ mensaje: 'No se encontraron contratos.' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error al obtener contratos:', error);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los contratos.',
      error: error.message
    });
  }
};

// Registrar un nuevo contrato
export const registrarContratos = async (req, res) => {
  try {
    const { Estado, Cantidad_Beneficiarios, Cuotas, Monto, Fecha_inicio, Fecha_fin, IDcliente } = req.body;

    // Validación de campos obligatorios
    if (!Estado || !Cantidad_Beneficiarios || !Cuotas || !Monto || !Fecha_inicio || !Fecha_fin || !IDcliente) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios para registrar el contrato.' });
    }

    const [result] = await pool.query(
      'INSERT INTO Contrato (Estado, Cantidad_Beneficiarios, Cuotas, Monto, Fecha_inicio, Fecha_fin, IDcliente) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Estado, Cantidad_Beneficiarios, Cuotas, Monto, Fecha_inicio, Fecha_fin, IDcliente]
    );

    res.status(201).json({ IDContrato: result.insertId });
  } catch (error) {
    console.error('Error al registrar contrato:', error);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el contrato.',
      error: error.message
    });
  }
};

// Eliminar un contrato por su ID
export const eliminarContrato = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Contrato WHERE IDContrato = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el contrato. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    console.error('Error al eliminar contrato:', error);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el contrato.',
      error: error.message
    });
  }
};

// Actualizar un contrato por su ID (parcial o completa)
export const actualizarContrato = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE Contrato SET ? WHERE IDContrato = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El contrato con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    console.error('Error al actualizar contrato:', error);
    return res.status(500).json({
      mensaje: 'Error al actualizar el contrato.',
      error: error.message
    });
  }
};