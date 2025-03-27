import { pool } from '../db.js';

// Obtener todos los agente
export const obtenerAgentes= async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Agente_co');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los agentes.',
      error: error
    });
  }
};

// Obtener un agente por su ID
export const obtenerAgente = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Agente_co WHERE IDAgente_co = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del agente no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del agente.'
    });
  }
};