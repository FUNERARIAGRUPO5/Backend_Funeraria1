import { pool } from '../db.js';

export const obtenerModelos= async (req, res) => {
    try {
      const [result] = await pool.query('SELECT * FROM Modelo');
      res.json(result);
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al leer los datos de los modelos.',
        error: error
      });
    }
  };
  
  // Obtener un contrato por su ID
  export const obtenerModelo = async (req, res) => {
    try {
      const [result] = await pool.query('SELECT * FROM Modelo WHERE IDModelo = ?', [req.params.id]);
      
      if (result.length <= 0) {
        return res.status(404).json({
          mensaje: `Error al leer los datos. El ID ${req.params.id} del cliente no fue encontrado.`
        });
      }
      res.json(result[0]);
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al leer los datos del modelo.'
      });
    }
  };