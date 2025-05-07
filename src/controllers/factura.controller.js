import { pool } from '../db.js';

// Obtener todas las facturas
export const obtenerFacturas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM factura');

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron facturas.' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    return res.status(500).json({
      mensaje: 'Error interno al obtener las facturas.',
      error: error.message
    });
  }
};

// Registrar una nueva factura
export const registrarFactura = async (req, res) => {
  try {
    const { IDAgente_co, IDContrato, Monto_DEC, Cuotas } = req.body;

    // Validación de campos obligatorios
    if (!IDAgente_co || !IDContrato || !Monto_DEC || !Cuotas) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    const [result] = await pool.query(
      'INSERT INTO factura (IDAgente_co, IDContrato, Monto_DEC, Cuotas) VALUES (?, ?, ?, ?)',
      [IDAgente_co, IDContrato, Monto_DEC, Cuotas]
    );

    res.status(201).json({
      mensaje: 'Factura registrada exitosamente.',
      IDFactura: result.insertId
    });
  } catch (error) {
    console.error('Error al registrar factura:', error);
    return res.status(500).json({
      mensaje: 'Error interno al registrar la factura.',
      error: error.message
    });
  }
};

// Eliminar una factura por su ID
export const eliminarFactura = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM factura WHERE IDFactura = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la factura. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    console.error('Error al eliminar factura:', error);
    return res.status(500).json({
      mensaje: 'Error interno al eliminar la factura.',
      error: error.message
    });
  }
};

// Actualizar una factura por su ID (parcial o completa)
export const actualizarFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE factura SET ? WHERE IDFactura = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `La factura con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    console.error('Error al actualizar factura:', error);
    return res.status(500).json({
      mensaje: 'Error interno al actualizar la factura.',
      error: error.message
    });
  }
};