import { pool } from '../db.js';

// Obtener todos los agente
export const obtenerBeneficiarios= async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Beneficiarios');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los agentes.',
      error: error
    });
  }
};

// Obtener un agente por su ID
export const obtenerBeneficiario = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Beneficiarios WHERE IDBeneficiarios = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del beneficiario no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del beneficioario.'
    });
  }
};