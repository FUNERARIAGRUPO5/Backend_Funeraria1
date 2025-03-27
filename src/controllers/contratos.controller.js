import { pool } from '../db.js';

export const obtenerContratos= async (req, res) => {
    try {
      const [result] = await pool.query('SELECT * FROM Contrato');
      res.json(result);
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al leer los datos de los clientes.',
        error: error
      });
    }
  };
  
  // Obtener un contrato por su ID
  export const obtenerContrato = async (req, res) => {
    try {
      const [result] = await pool.query('SELECT * FROM Contrato WHERE IDContrato = ?', [req.params.id]);
      
      if (result.length <= 0) {
        return res.status(404).json({
          mensaje: `Error al leer los datos. El ID ${req.params.id} del cliente no fue encontrado.`
        });
      }
      res.json(result[0]);
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al leer los datos del cliente.'
      });
    }
  };