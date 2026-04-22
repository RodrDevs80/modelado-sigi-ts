import { DataType, Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import sequelize from "../config/database/conexion.js";


interface EstudianteAttributes extends InferAttributes<Estudiante> {
  id: number;
  dni: number;
  nombre: string;
  apellido: string;
  email: string;
  trabaja: boolean | null;
  activo: boolean;
  idUsuario: number;
  idAdministrativo: number;
}

interface EstudianteCreationAttributes extends InferCreationAttributes<Estudiante> {
  id: CreationOptional<number>;
  dni: number;
  nombre: string;
  apellido: string;
  email: string;
  trabaja: boolean | null;
  activo: CreationOptional<boolean>;
  idUsuario: number;
  idAdministrativo: number;
}

class Estudiante extends Model<EstudianteAttributes, EstudianteCreationAttributes> {
  declare id: CreationOptional<number>;
  declare dni: number;
  declare nombre: string;
  declare apellido: string;
  declare email: string;
  declare trabaja: boolean | null;
  declare activo: CreationOptional<boolean>;
  declare idUsuario: number;
  declare idAdministrativo: number;
}

Estudiante.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: { name: "dni", msg: "El DNI ya está registrado" },
      validate: {
        notEmpty: { msg: "El DNI es obligatorio" },
        esNumerico(value: string) {
          if (!/^\d+$/.test(value)) {
            throw new Error("El DNI debe contener únicamente números");
          }
        },
      },
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: { msg: "El nombre es obligatorio" } },

    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: { msg: "El apellido es obligatorio" } },
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: { name: "email", msg: "El email ya está registrado" },
      validate: {
        isEmail: { msg: "Debe proporcionar un email válido" },
        notEmpty: { msg: "El email es obligatorio" },
      },
    },
    trabaja: {
      type: DataTypes.BOOLEAN,
      allowNull: true
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
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_usuario",
      references: {
        model: "usuarios",
        key: "id"
      }
    }
  },
  {
    sequelize,
    tableName: "estudiantes",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion"
  }
)


export default Estudiante;