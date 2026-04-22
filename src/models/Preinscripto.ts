import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface PreinscriptoAttributes extends InferAttributes<Preinscripto> {
  id: number;
  idInscripcionCarrera: number;
  idUsuario: number;
  fechaInscripcion: string;
  cus: string;
  isa: string;
  emmac: string | null;
  estado: "pendiente" | "aprobado" | "rechazado";
  idAdministrativo: number;
}
interface PreinscriptoCreationAttributes extends InferCreationAttributes<Preinscripto> {
  id: CreationOptional<number>;
  idInscripcionCarrera: number;
  idUsuario: number;
  fechaInscripcion: string;
  cus: string;
  isa: string;
  emmac: string | null;
  estado: CreationOptional<"pendiente" | "aprobado" | "rechazado">;
  idAdministrativo: number;
}

class Preinscripto extends Model<PreinscriptoAttributes, PreinscriptoCreationAttributes> {
  declare id: CreationOptional<number>;
  declare idInscripcionCarrera: number;
  declare idUsuario: number;
  declare fechaInscripcion: string;
  declare cus: string;
  declare isa: string;
  declare emmac: string | null;
  declare estado: CreationOptional<"pendiente" | "aprobado" | "rechazado">;
  declare idAdministrativo: number;
}

Preinscripto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idInscripcionCarrera: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_inscripcion",
      references: {
        model: "inscripciones_carreras",
        key: "id"
      }
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_usuario",
      references: {
        model: "usuarios",
        key: "id"
      }
    },
    fechaInscripcion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emmac: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "aprobado", "rechazado"),
      defaultValue: "pendiente"
    },
    idAdministrativo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_administrativo",
      references: {
        model: "administrativos",
        key: "id"
      }
    }
  },
  {
    sequelize,
    indexes: [
      { fields: ['id_inscripcion'] },
      { fields: ['id_usuario'] },
      { fields: ['id_administrativo'] },
      { fields: ['estado'] }
    ],
    tableName: "preinscriptos",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion"
  }
)

export default Preinscripto;