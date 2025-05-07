import { pool } from '../db.js';

// Obtener todos los agentes
export const obtenerAgentes = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM agente_co');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los agentes.',
      error: error.message
    });
  }
};

// Registrar un agente
export const registrarAgentes = async (req, res) => {
  try {
    const { Nombre, Telefono } = req.body;

    if (!Nombre || !Telefono) {
      return res.status(400).json({ 
        mensaje: 'Faltan campos obligatorios: Nombre y Teléfono.' 
      });
    }

    if (typeof Nombre !== 'string' || typeof Telefono !== 'string') {
      return res.status(400).json({ 
        mensaje: 'Los datos proporcionados tienen un formato incorrecto.' 
      });
    }

    const [result] = await pool.query(
      'INSERT INTO agente_co (Nombre, Telefono) VALUES (?, ?)',
      [Nombre, Telefono]
    );

    res.status(201).json({ IDAgente_co: result.insertId }); // Updated to match column name
  } catch (error) {
    console.error('Error al registrar agente:', error.message);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el agente.',
      error: error.message
    });
  }
};

// Eliminar un agente por su ID
export const eliminarAgente = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM agente_co WHERE IDAgente_co = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el agente. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el agente.',
      error: error.message
    });
  }
};

// Actualizar un agente por su ID (parcial o completa)
export const actualizarAgente = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE agente_co SET ? WHERE IDAgente_co = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El agente con ID ${id} no existe.`,
      });
    }

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar el agente.',
      error: error.message
    });
  }
};