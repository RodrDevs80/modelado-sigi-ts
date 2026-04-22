import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface CarreraAttributes extends InferAttributes<Carrera> {
  id: number;
  codigo: string;
  nombre: string;
  tipo: "permanente" | "a_termino";
  activo: boolean;
  idAdministrativo: number;
}

interface CarreraCreationAttributes extends InferCreationAttributes<Carrera> {
  id: CreationOptional<number>;
  codigo: string;
  nombre: string;
  tipo: "permanente" | "a_termino";
  activo: CreationOptional<boolean>;
  idAdministrativo: number;
}

class Carrera extends Model<CarreraAttributes, CarreraCreationAttributes> {
  declare id: CreationOptional<number>;
  declare codigo: string;
  declare nombre: string;
  declare tipo: "permanente" | "a_termino";
  declare activo: CreationOptional<boolean>;
  declare idAdministrativo: number;
}

Carrera.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre es obligatorio" },
      },
    },
    tipo: {
      type: DataTypes.ENUM("permanente", "a_termino"),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
    tableName: "carreras",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

export default Carrera;