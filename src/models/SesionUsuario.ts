import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface SesionUsuarioAttributes extends InferAttributes<SesionUsuario> {
  id: number;
  idUsuario: number;
  fechaInicioSesion: Date;
  fechaCierreSesion: Date | null;
  intentoFallido: number;
  bloqueado: boolean;
  idAdministrativo: number | null;
  idDocente: number | null;
}

interface SesionUsuarioCreationAttributes extends InferCreationAttributes<SesionUsuario> {
  id: CreationOptional<number>;
  idUsuario: number;
  fechaInicioSesion: CreationOptional<Date>;
  fechaCierreSesion: Date | null;
  intentoFallido: number;
  bloqueado: boolean;
  idAdministrativo: number | null;
  idDocente: number | null;
}

class SesionUsuario extends Model<SesionUsuarioAttributes, SesionUsuarioCreationAttributes> {
  declare id: CreationOptional<number>;
  declare idUsuario: number;
  declare fechaInicioSesion: CreationOptional<Date>;
  declare fechaCierreSesion: Date | null;
  declare intentoFallido: number;
  declare bloqueado: boolean;
  declare idAdministrativo: number | null;
  declare idDocente: number | null;
}

SesionUsuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_usuario",
      references: { model: "usuarios", key: "id" },
    },
    fechaInicioSesion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "fecha_inicio_sesion",
    },
    fechaCierreSesion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "fecha_cierre_sesion",
    },
    intentoFallido: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "intento_fallido",
    },
    bloqueado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    idAdministrativo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "id_administrativo",
      references: { model: "administrativos", key: "id" },
    },
    idDocente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "id_docente",
      references: { model: "docentes", key: "id" },
    },
  },
  {
    sequelize,
    tableName: "sesiones_usuario",
    timestamps: false,
  }
);

export default SesionUsuario;