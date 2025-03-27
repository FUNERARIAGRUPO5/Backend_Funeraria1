-- Base de datos
CREATE DATABASE IF NOT EXISTS Funeraria;
USE Funeraria;

-- Crear tabla Cliente primero
CREATE TABLE Cliente (
  IDcliente INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50) NOT NULL,
  Apellido VARCHAR(20) NOT NULL,
  Direccion VARCHAR(50) NOT NULL,
  Cedula VARCHAR(50) NOT NULL,
  Telefono VARCHAR(10) NOT NULL
);

-- Luego creamos la tabla Contrato
CREATE TABLE Contrato (
  IDContrato INT AUTO_INCREMENT PRIMARY KEY,
  Estado VARCHAR(50) NOT NULL,
  Cantidad_Beneficiarios VARCHAR(50) NOT NULL,
  Cuotas VARCHAR(50) NOT NULL,
  Monto INT NOT NULL,
  IDcliente INT NOT NULL,
  FOREIGN KEY (IDcliente) REFERENCES Cliente(IDcliente)
);

-- Luego Agente_co, ya que no depende de otras tablas
CREATE TABLE Agente_co (
  IDAgente_co INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50) NOT NULL,
  Telefono VARCHAR(10) NOT NULL
);

-- Beneficiarios, que depende de Contrato
CREATE TABLE Beneficiarios (
  IDBeneficiarios INT AUTO_INCREMENT PRIMARY KEY,
  Nombre CHAR(20) NOT NULL,
  Apellido CHAR(30) NOT NULL,
  Cedula CHAR(20) NOT NULL,
  Telefono CHAR(10) NOT NULL,
  IDContratos INT NOT NULL,
  FOREIGN KEY (IDContratos) REFERENCES Contrato(IDContrato)
);

-- Crear Factura después de Contrato y Agente_co
CREATE TABLE Factura (
  IDFactura INT AUTO_INCREMENT PRIMARY KEY,
  IDAgente_co INT NOT NULL,
  IDContrato INT NOT NULL,
  Monto_DEC INT NOT NULL,
  Cuotas INT,
  FOREIGN KEY (IDAgente_co) REFERENCES Agente_co(IDAgente_co),
  FOREIGN KEY (IDContrato) REFERENCES Contrato(IDContrato)
);

-- Crear Modelo ya que no depende de otras tablas
CREATE TABLE Modelo (
  IDModelo INT AUTO_INCREMENT PRIMARY KEY,
  Nombre CHAR(20) NOT NULL,
  Modelo CHAR(40) NOT NULL,
  Medida VARCHAR(8) NOT NULL,
  Color CHAR(40) NOT NULL
);

-- Crear Servicio_At, que depende de Modelo y Contrato
CREATE TABLE Servicio_At (
  IDServicio_At INT AUTO_INCREMENT PRIMARY KEY,
  Codigo_de_Modelo CHAR(10) NOT NULL,
  monto INT NOT NULL,
  IDModelo INT NOT NULL,
  ID_Contrato INT NOT NULL,
  FOREIGN KEY (IDModelo) REFERENCES Modelo(IDModelo),
  FOREIGN KEY (ID_Contrato) REFERENCES Contrato(IDContrato)
);

-- Finalmente DetalleFactura, que no depende de otras tablas
CREATE TABLE DetalleFactura (
  IDDetalle INT AUTO_INCREMENT PRIMARY KEY,
  numFacturas INT NOT NULL,
  Agentes VARCHAR(50) NOT NULL,
  Cliente VARCHAR(20)
);

Create table Usuarios (
usuario varchar (20) primary key not null,
contraseña varchar (20) not null
);


-- Procedimientos almacenados

DELIMITER //

-- Procedimiento actualizaExistenciaFac
CREATE PROCEDURE actualizaExistenciaFac(IN nuevoPago INT, IN id_producto INT)
BEGIN
  UPDATE Contrato 
  SET Monto = nuevoPago
  WHERE IDContrato = id_producto;
END //

-- Procedimiento Agente_actualizar
CREATE PROCEDURE Agente_actualizar(IN IDAgente_co INT, IN Nombre CHAR(20), IN Telefono INT)
BEGIN
  UPDATE Agente_co
  SET 
    Nombre = Nombre,
    Telefono = Telefono
  WHERE IDAgente_co = IDAgente_co;
END //

-- Procedimiento Beneficiario_actualizar
CREATE PROCEDURE Beneficiario_actualizar(
  IN IDBeneficiarios INT, 
  IN Nombre VARCHAR(20), 
  IN Apellido VARCHAR(30), 
  IN Cedula VARCHAR(20), 
  IN Telefono VARCHAR(10), 
  IN IDContratos INT
)
BEGIN
  UPDATE Beneficiarios
  SET 
    Nombre = Nombre,
    Apellido = Apellido,
    Cedula = Cedula,
    Telefono = Telefono,
    IDContratos = IDContratos
  WHERE IDBeneficiarios = IDBeneficiarios;
END //

-- Procedimiento Beneficiario_listar
CREATE PROCEDURE Beneficiario_listar()
BEGIN
  SELECT * FROM Beneficiarios;
END //

-- Procedimiento BuscarAgente
CREATE PROCEDURE BuscarAgente(IN parametroBusqueda VARCHAR(25))
BEGIN
  SELECT * FROM Servicio_At
  WHERE IDServicio_At LIKE CONCAT('%', parametroBusqueda, '%')
     OR Codigo_de_Modelo LIKE CONCAT('%', parametroBusqueda, '%')
     OR monto LIKE CONCAT('%', parametroBusqueda, '%')
     OR IDModelo LIKE CONCAT('%', parametroBusqueda, '%')
     OR ID_Contrato LIKE CONCAT('%', parametroBusqueda, '%');
END //

-- Procedimiento buscarBeneficiarios
CREATE PROCEDURE buscarBeneficiarios(IN parametroBusqueda VARCHAR(25))
BEGIN
  SELECT * FROM Beneficiarios
  WHERE IDBeneficiarios LIKE CONCAT('%', parametroBusqueda, '%')
     OR Nombre LIKE CONCAT('%', parametroBusqueda, '%')
     OR Apellido LIKE CONCAT('%', parametroBusqueda, '%')
     OR Cedula LIKE CONCAT('%', parametroBusqueda, '%')
     OR Telefono LIKE CONCAT('%', parametroBusqueda, '%')
     OR IDContratos LIKE CONCAT('%', parametroBusqueda, '%');
END //

-- Procedimiento buscarContrato
CREATE PROCEDURE buscarContrato(IN parametroBusqueda VARCHAR(25))
BEGIN
  SELECT * FROM Contrato
  WHERE IDContrato LIKE CONCAT('%', parametroBusqueda, '%')
     OR Estado LIKE CONCAT('%', parametroBusqueda, '%')
     OR Cantidad_Beneficiarios LIKE CONCAT('%', parametroBusqueda, '%')
     OR Cuotas LIKE CONCAT('%', parametroBusqueda, '%')
     OR Monto LIKE CONCAT('%', parametroBusqueda, '%')
     OR IDcliente LIKE CONCAT('%', parametroBusqueda, '%');
END //

-- Procedimiento buscarModelo
CREATE PROCEDURE buscarModelo(IN parametroBusqueda VARCHAR(25))
BEGIN
  SELECT * FROM Modelo
  WHERE IDModelo LIKE CONCAT('%', parametroBusqueda, '%')
     OR Nombre LIKE CONCAT('%', parametroBusqueda, '%')
     OR Modelo LIKE CONCAT('%', parametroBusqueda, '%')
     OR Medida LIKE CONCAT('%', parametroBusqueda, '%')
     OR Color LIKE CONCAT('%', parametroBusqueda, '%');
END //

-- Procedimiento buscarServicios
CREATE PROCEDURE buscarServicios(
  IN IDServicio_At INT DEFAULT NULL,
  IN Codigo_de_Modelo VARCHAR(20) DEFAULT NULL,
  IN monto INT DEFAULT NULL,
  IN IDModelo INT DEFAULT NULL,
  IN ID_Contrato INT DEFAULT NULL
)
BEGIN
  SELECT IDServicio_At, Codigo_de_Modelo, monto, IDModelo, ID_Contrato
  FROM Servicio_At
  WHERE (IDServicio_At IS NULL OR IDServicio_At = IDServicio_At)
    AND (Codigo_de_Modelo IS NULL OR Codigo_de_Modelo LIKE CONCAT('%', Codigo_de_Modelo, '%'))
    AND (monto IS NULL OR monto = monto)
    AND (IDModelo IS NULL OR IDModelo = IDModelo)
    AND (ID_Contrato IS NULL OR ID_Contrato = ID_Contrato);
END //

DELIMITER ;