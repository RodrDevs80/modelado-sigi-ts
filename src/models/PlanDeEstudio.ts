import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface PlanDeEstudioAttributes extends InferAttributes<PlanDeEstudio> {
  id: CreationOptional<number>;
  version: string;
  fechaDeAprobacion: string; // DATEONLY se maneja como string 'YYYY-MM-DD'
  fechaDeCierre: string;
  duracionEnAnios: number;
  estado: string;
  idCarrera: number;
  idAdministrativo: number;
}

interface PlanDeEstudioCreationAttributes extends InferCreationAttributes<PlanDeEstudio> {
  version: string;
  fechaDeAprobacion: string;
  fechaDeCierre: string;
  duracionEnAnios: number;
  estado: string;
  idCarrera: number;
  idAdministrativo: number;
}

class PlanDeEstudio extends Model<PlanDeEstudioAttributes, PlanDeEstudioCreationAttributes> {
  declare id: CreationOptional<number>;
  declare version: string;
  declare fechaDeAprobacion: string;
  declare fechaDeCierre: string;
  declare duracionEnAnios: number;
  declare estado: string | null;
  declare idCarrera: number;
  declare idAdministrativo: number;
}

PlanDeEstudio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaDeAprobacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "fecha_de_aprobacion",
    },
    fechaDeCierre: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "fecha_de_cierre",
    },
    duracionEnAnios: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "duracion_en_anios",
    },
    estado: {
      type: DataTypes.STRING, // o ENUM si se definen valores
      allowNull: true,
    },
    idCarrera: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "carreras",
        key: "id",
      },
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
    tableName: "plan_de_estudio",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

export default PlanDeEstudio;