import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface InscripcionCarreraAttributes extends InferAttributes<InscripcionCarrera> {
  id: CreationOptional<number>;
  cupo: number | null;
  regularidadCarrera: string | null;
  fechaDesde: string | null;
  fechaHasta: string | null;
  idPlanDeEstudio: number;
  idAdministrativo: number;
}

interface InscripcionCarreraCreationAttributes extends InferCreationAttributes<InscripcionCarrera> {
  cupo: number | null;
  regularidadCarrera: string | null;
  fechaDesde: string | null;
  fechaHasta: string | null;
  idPlanDeEstudio: number;
  idAdministrativo: number;
}

class InscripcionCarrera extends Model<InscripcionCarreraAttributes, InscripcionCarreraCreationAttributes> {
  declare id: CreationOptional<number>;
  declare cupo: number | null;
  declare regularidadCarrera: string | null;
  declare fechaDesde: string | null;
  declare fechaHasta: string | null;
  declare idPlanDeEstudio: number;
  declare idAdministrativo: number;
}

InscripcionCarrera.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cupo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    regularidadCarrera: {
      type: DataTypes.STRING,
      field: "regularidad_carrera",
    },
    fechaDesde: {
      type: DataTypes.DATEONLY,
      field: "fecha_desde",
    },
    fechaHasta: {
      type: DataTypes.DATEONLY,
      field: "fecha_hasta",
    },
    idPlanDeEstudio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "plan_de_estudio",
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
    tableName: "inscripcion_carrera",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

export default InscripcionCarrera;