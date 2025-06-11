import { pool } from '../db.js';

export const obtenerServicios = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM servicio_at');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los servicios.',
      error: error.message
    });
  }
};

export const registrarServicio = async (req, res) => {
  try {
    const { Nombre, Codigo_de_Modelo, monto, IDModelo, ID_Contrato } = req.body;

    if (!Nombre || !Codigo_de_Modelo || monto === undefined || !IDModelo || !ID_Contrato) {
      return res.status(400).json({
        mensaje: 'Faltan campos obligatorios: Nombre, Codigo_de_Modelo, monto, IDModelo y ID_Contrato.'
      });
    }

    if (typeof Nombre !== 'string' || typeof Codigo_de_Modelo !== 'string' ||
        typeof monto !== 'number' || typeof IDModelo !== 'number' || typeof ID_Contrato !== 'number') {
      return res.status(400).json({
        mensaje: 'Los datos proporcionados tienen un formato incorrecto.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO servicio_at (Nombre, Codigo_de_Modelo, monto, IDModelo, ID_Contrato) VALUES (?, ?, ?, ?, ?)',
      [Nombre, Codigo_de_Modelo, monto, IDModelo, ID_Contrato]
    );
    res.status(201).json({ ID_Servicio: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el servicio.',
      error: error.message
    });
  }
};

export const eliminarServicio = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM servicio_at WHERE ID_Servicio = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el servicio. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el servicio.',
      error: error.message
    });
  }
};

export const actualizarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Codigo_de_Modelo, monto, IDModelo, ID_Contrato } = req.body;

    // Validación estricta de datos
    if (!Nombre || !Codigo_de_Modelo || monto === undefined || !IDModelo || !ID_Contrato) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }
    if (typeof Nombre !== 'string' || typeof Codigo_de_Modelo !== 'string' ||
        typeof monto !== 'number' || typeof IDModelo !== 'number' || typeof ID_Contrato !== 'number') {
      return res.status(400).json({ mensaje: 'Formato de datos inválido.' });
    }

    console.log('Datos recibidos para actualizar (ID:', id, '):', { Nombre, Codigo_de_Modelo, monto, IDModelo, ID_Contrato });

    const [resultado] = await pool.query(
      'UPDATE servicio_at SET Nombre = ?, Codigo_de_Modelo = ?, monto = ?, IDModelo = ?, ID_Contrato = ? WHERE ID_Servicio = ?',
      [Nombre, Codigo_de_Modelo, monto, IDModelo, ID_Contrato, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El servicio con ID ${id} no existe.`,
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error detallado al actualizar servicio (ID:', req.params.id, '):', error);
    return res.status(500).json({
      mensaje: 'Error al actualizar el servicio.',
      error: error.message,
      stack: error.stack // Para más detalles en desarrollo
    });
  }
};