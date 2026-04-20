import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface CarreraAttributes extends InferAttributes<Carrera> {
  id: CreationOptional<number>;
  codigo: string;
  nombre: string;
  tipo: "permanente" | "a_termino";
  estado: "activa" | "en cierre";
  idAdministrativo: number;
}

interface CarreraCreationAttributes extends InferCreationAttributes<Carrera> {
  codigo: string;
  nombre: string;
  tipo: "permanente" | "a_termino";
  estado: "activa" | "en cierre";
  idAdministrativo: number;
}

class Carrera extends Model<CarreraAttributes, CarreraCreationAttributes> {
  declare id: CreationOptional<number>;
  declare codigo: string;
  declare nombre: string;
  declare tipo: "permanente" | "a_termino";
  declare estado: "activa" | "en cierre";
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
    estado: {
      type: DataTypes.ENUM("activa", "en cierre"),
      defaultValue: "activa"
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