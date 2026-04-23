import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface TipoDocumentoRequeridoAttributes extends InferAttributes<TipoDocumentoRequerido> {
  id: number;
  idCarrera: number;
  nombreDocumento: string;
  obligatorio: boolean;
  esCritico: boolean;
  descripcion: string | null;
  diasVigencia: number | null;
  idAdministrativo: number;
}

interface TipoDocumentoRequeridoCreationAttributes extends InferCreationAttributes<TipoDocumentoRequerido> {
  id: CreationOptional<number>;
  idCarrera: number;
  nombreDocumento: string;
  obligatorio: boolean;
  esCritico: boolean;
  descripcion: string | null;
  diasVigencia: number | null;
  idAdministrativo: number;
}

class TipoDocumentoRequerido extends Model<TipoDocumentoRequeridoAttributes, TipoDocumentoRequeridoCreationAttributes> {
  declare id: CreationOptional<number>;
  declare idCarrera: number;
  declare nombreDocumento: string;
  declare obligatorio: boolean;
  declare esCritico: boolean;
  declare descripcion: string | null;
  declare diasVigencia: number | null;
  declare idAdministrativo: number;
}

TipoDocumentoRequerido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idCarrera: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_carrera",
      references: { model: "carreras", key: "id" },
    },
    nombreDocumento: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "nombre_documento",
    },
    obligatorio: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    esCritico: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "es_critico",
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    diasVigencia: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "dias_vigencia",
    },
    idAdministrativo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_administrativo",
      references: { model: "administrativos", key: "id" },
    },
  },
  {
    sequelize,
    tableName: "tipos_documento_requerido",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

export default TipoDocumentoRequerido;