import { pool } from '../db.js';

// Obtener todos los modelos
export const obtenerModelos = async (req, res) => {
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

// Registrar un nuevo modelo
export const registrarModelo = async (req, res) => {
  try {
    const { Nombre, Modelo, Medida, Color } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO Modelo (Nombre, Modelo, Medida, Color) VALUES (?, ?, ?, ?)',
      [Nombre, Modelo, Medida, Color]
    );
    res.status(201).json({ IDModelo: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el modelo.'
    });
  }
};

// Eliminar un modelo por su ID
export const eliminarModelo = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Modelo WHERE IDModelo = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el modelo. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el modelo.',
      error: error
    });
  }
};

// Actualizar un modelo por su ID (parcial o completa)
export const actualizarModelo = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE Modelo SET ? WHERE IDModelo = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El modelo con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar el modelo.',
      error: error
    });
  }
};