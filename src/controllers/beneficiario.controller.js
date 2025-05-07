import { pool } from '../db.js';

// Obtener todos los beneficiarios
export const obtenerBeneficiarios = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Beneficiarios');
    res.json(result);
  } catch (error) {
    console.error('Error al obtener beneficiarios:', error.message);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los beneficiarios.',
      error: error.message
    });
  }
};

// Registrar un beneficiario
export const registrarBeneficiarios = async (req, res) => {
  try {
    const { Nombre, Apellido, Cedula, Telefono, IDContratos } = req.body;

    // Validación de campos obligatorios
    if (!Nombre || !Apellido || !Cedula || !Telefono || !IDContratos) {
      return res.status(400).json({ 
        mensaje: 'Faltan campos obligatorios: Nombre, Apellido, Cedula, Telefono e IDContratos son requeridos.' 
      });
    }

    // Validación adicional: tipo de datos
    if (
      typeof Nombre !== 'string' || 
      typeof Apellido !== 'string' || 
      typeof Cedula !== 'string' || 
      typeof Telefono !== 'string' || 
      (typeof IDContratos !== 'number' && typeof IDContratos !== 'string')
    ) {
      return res.status(400).json({ 
        mensaje: 'Los datos proporcionados tienen un formato incorrecto. Nombre, Apellido, Cedula y Telefono deben ser cadenas de texto, e IDContratos debe ser un número o una cadena.' 
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Beneficiarios (Nombre, Apellido, Cedula, Telefono, IDContratos) VALUES (?, ?, ?, ?, ?)',
      [Nombre, Apellido, Cedula, Telefono, IDContratos]
    );

    res.status(201).json({ IDBeneficiarios: result.insertId });
  } catch (error) {
    console.error('Error al registrar beneficiario:', error.message);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el beneficiario.',
      error: error.message
    });
  }
};

// Eliminar un beneficiario por su ID
export const eliminarBeneficiario = async (req, res) => {
  try {
    const id = parseInt(req.params.id); // Convertir el ID a entero
    if (isNaN(id)) {
      return res.status(400).json({
        mensaje: 'El ID proporcionado no es válido. Debe ser un número.'
      });
    }

    const [result] = await pool.query('DELETE FROM beneficiarios WHERE IDBeneficiarios = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el beneficiario. El ID ${id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    console.error('Error al eliminar beneficiario:', error.message);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el beneficiario.',
      error: error.message
    });
  }
};

// Actualizar un beneficiario por su ID (parcial o completa)
export const actualizarBeneficiario = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    // Validar que el ID sea un número
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res.status(400).json({
        mensaje: 'El ID proporcionado no es válido. Debe ser un número.'
      });
    }

    // Validar que haya datos para actualizar
    if (!Object.keys(datos).length) {
      return res.status(400).json({
        mensaje: 'No se proporcionaron datos para actualizar.'
      });
    }

    // Validar tipos de datos si se proporcionan
    if (datos.Nombre && typeof datos.Nombre !== 'string') {
      return res.status(400).json({ mensaje: 'El campo Nombre debe ser una cadena de texto.' });
    }
    if (datos.Apellido && typeof datos.Apellido !== 'string') {
      return res.status(400).json({ mensaje: 'El campo Apellido debe ser una cadena de texto.' });
    }
    if (datos.Cedula && typeof datos.Cedula !== 'string') {
      return res.status(400).json({ mensaje: 'El campo Cedula debe ser una cadena de texto.' });
    }
    if (datos.Telefono && typeof datos.Telefono !== 'string') {
      return res.status(400).json({ mensaje: 'El campo Telefono debe ser una cadena de texto.' });
    }
    if (datos.IDContratos && (typeof datos.IDContratos !== 'number' && typeof datos.IDContratos !== 'string')) {
      return res.status(400).json({ mensaje: 'El campo IDContratos debe ser un número o una cadena.' });
    }

    const [resultado] = await pool.query(
      'UPDATE Beneficiarios SET ? WHERE IDBeneficiarios = ?',
      [datos, parsedId]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El beneficiario con ID ${parsedId} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    console.error('Error al actualizar beneficiario:', error.message);
    return res.status(500).json({
      mensaje: 'Error al actualizar el beneficiario.',
      error: error.message
    });
  }
};