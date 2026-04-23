//realizar cambios en los atributos según lo dicho el profe
//pensando en lo simple: que el administrador es solo el que manda las notificaciones

import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";



interface NotificacionAttributes extends InferAttributes<Notificacion> {
  id: number;
  idEstudiante: number;
  titulo: string;
  mensaje: string;
  tipo: string;
  entidadRelacionada: string | null;
  entidadId: number | null;
  leida: boolean;
  fechaCreacion: Date;
  idDocente: number | null;
  idAdministrativo: number | null;
}

interface NotificacionCreationAttributes extends InferCreationAttributes<Notificacion> {
  id: CreationOptional<number>;
  idEstudiante: number;
  titulo: string;
  mensaje: string;
  tipo: string;
  entidadRelacionada: string | null;
  entidadId: number | null;
  leida: boolean;
  fechaCreacion: CreationOptional<Date>;
  idDocente: number | null;
  idAdministrativo: number | null;
}

class Notificacion extends Model<NotificacionAttributes, NotificacionCreationAttributes> {
  declare id: CreationOptional<number>;
  declare idEstudiante: number;
  declare titulo: string;
  declare mensaje: string;
  declare tipo: string;
  declare entidadRelacionada: string | null;
  declare entidadId: number | null;
  declare leida: boolean;
  declare fechaCreacion: CreationOptional<Date>;
  declare idDocente: number | null;
  declare idAdministrativo: number | null;
}

Notificacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idEstudiante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_estudiante",
      references: { model: "estudiantes", key: "id" },
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { isIn: [["ACADEMICA", "PAGO", "ADMINISTRATIVA", "EXAMEN"]] },
    },
    entidadRelacionada: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "entidad_relacionada",
    },
    entidadId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "entidad_id",
    },
    leida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fechaCreacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "fecha_creacion",
    },
    idDocente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "id_docente",
      references: { model: "docentes", key: "id" },
    },
    idAdministrativo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "id_administrativo",
      references: { model: "administrativos", key: "id" },
    },
  },
  {
    sequelize,
    tableName: "notificaciones",
    timestamps: false,
  }
);

export default Notificacion;