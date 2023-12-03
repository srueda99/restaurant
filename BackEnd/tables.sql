USE login;

CREATE TABLE users (  
  username VARCHAR(15) PRIMARY kEY,
  email VARCHAR(50),
  hash VARCHAR(1000), 
);

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(15),
  name VARCHAR(60),
  email VARCHAR(30),
  num INT,
  sede VARCHAR(15),
  date DATE,
  time TIME,
  FOREIGN KEY (username) REFERENCES users(username),
  FOREIGN KEY (sede) REFERENCES sedes(name)
);

CREATE TABLE sedes ( 
  name VARCHAR(15) PRIMARY KEY,
  cupos_totales INT,
  cupos_disp INT
);

CREATE TABLE tipos_comidas(
  tipo VARCHAR(15) PRIMARY kEY
);

CREATE TABLE productos (
  nombre VARCHAR(25) PRIMARY KEY, 
  tipo VARCHAR(15),
  descripcion VARCHAR(1000),
  precio INT, 
  imagen VARCHAR(50),
  FOREIGN KEY (tipo) REFERENCES tipos_comidas(tipo)
);

INSERT INTO sedes(name, cupos_totales, cupos_disp) VALUES('Laureles', 10, 10);
INSERT INTO sedes(name, cupos_totales, cupos_disp) VALUES('Poblado', 15, 15);
INSERT INTO sedes(name, cupos_totales, cupos_disp) VALUES('Sabaneta', 15, 15);