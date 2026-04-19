import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface CarreraAttributes extends InferAttributes<Carrera> {
  id: CreationOptional<number>;
  codigo: string;
  nombre: string;
  tipo: "permanente" | "a_termino" | null;
  activo: CreationOptional<boolean>;
}

interface CarreraCreationAttributes extends InferCreationAttributes<Carrera> {
  codigo: string;
  nombre: string;
  tipo: "permanente" | "a_termino" | null;
  activo: boolean;
}

class Carrera extends Model<CarreraAttributes, CarreraCreationAttributes> {
  declare id: CreationOptional<number>;
  declare codigo: string;
  declare nombre: string;
  declare tipo: "permanente" | "a_termino" | null;
  declare activo: CreationOptional<boolean>;
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
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "carreras",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion", // corregido nombre del campo (antes decía "fecha_fecha_actualizacion")
  }
);

export default Carrera;