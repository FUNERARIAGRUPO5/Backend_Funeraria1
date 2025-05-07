import { pool } from '../db.js';

// Obtener todos los cliente
export const obtenerClientes= async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Cliente');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los agentes.',
      error: error
    });
  }
};

// Obtener un agente por su ID
export const registrarCliente = async (req, res) => {
  try {
    const {Nombre, Apellido, Direccion, Cedula, Telefono} = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO Cliente (Nombre, Apellido, Direccion, Cedula, Telefono) VALUES (?, ?, ?, ?, ?)',
      [Nombre, Apellido, Direccion, Cedula, Telefono]
    );
    res.status(201).json({ IDcliente: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del cliente.'
    });
  }
};

// Eliminar un cliente por su ID
export const eliminarCliente = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Cliente WHERE IDcliente = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el cliente. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el cliente.',
      error: error
    });
  }
};

// Actualizar un cliente por su ID (parcial o completa)
export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE Cliente SET ? WHERE IDcliente = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El cliente con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar el cliente.',
      error: error
    });
  }
};

