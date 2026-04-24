import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface NotificacionAttributes extends InferAttributes<Notificacion> {
  id: number;
  idEstudiante: number | null;
  idDocente: number | null;
  idAdministrativo: number;
  titulo: string;
  mensaje: string;
  prioridad: string;
  leida: boolean;
  fechaCreacion: Date;
}

interface NotificacionCreationAttributes extends InferCreationAttributes<Notificacion> {
  id: CreationOptional<number>;
  idEstudiante: number | null;
  idDocente: number | null;
  idAdministrativo: number;
  titulo: string;
  mensaje: string;
  prioridad: string;
  leida: boolean;
  fechaCreacion: CreationOptional<Date>;
}

class Notificacion extends Model<NotificacionAttributes, NotificacionCreationAttributes> {
  declare id: CreationOptional<number>;
  declare idEstudiante: number | null;
  declare idDocente: number | null;
  declare idAdministrativo: number;
  declare titulo: string;
  declare mensaje: string;
  declare prioridad: string;
  declare leida: boolean;
  declare fechaCreacion: CreationOptional<Date>;
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
      allowNull: true,
      field: "id_estudiante",
      references: { model: "estudiantes", key: "id" },
    },
    idDocente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "id_docente",
      references: { model: "docentes", key: "id" },
    },
    idAdministrativo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_administrativo",
      references: { model: "administrativos", key: "id" },
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    prioridad: {
      type: DataTypes.ENUM("alta", "media", "baja"),
      allowNull: false,
      defaultValue: "media",
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
  },
  {
    sequelize,
    tableName: "notificaciones",
    timestamps: false,
    validate: {
      atLeastOneRecipient() {
        if (!this.idEstudiante && !this.idDocente) {
          throw new Error("La notificación debe tener al menos un destinatario (estudiante o docente).");
        }
      },
    },
  }
);

export default Notificacion;