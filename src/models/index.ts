import sequelize from "../config/database/conexion.js";
import Administrativo from "./Administrativo.js";
import Carrera from "./Carrera.js";
import Docente from "./Docente.js";
import InscripcionCarrera from "./InscripcionCarrera.js";
import PlanDeEstudio from "./PlanDeEstudio.js";
import Rol from "./Rol.js";
import Usuario from "./Usuario.js";

// Definir asociaciones aquí si las hubiera
// Ejemplo: Rol.hasMany(Administrativo, { foreignKey: "idRol" });
// Administrativo.belongsTo(Rol, { foreignKey: "idRol" });

export {
  sequelize,
  Administrativo,
  Carrera,
  Docente,
  InscripcionCarrera,
  PlanDeEstudio,
  Rol,
  Usuario,
};