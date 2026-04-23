import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface RecuperacionContraseniaAttributes extends InferAttributes<RecuperacionContrasenia> {
  id: number;
  idUsuario: number;
  fechaExpiracion: Date;
  usado: boolean;
  fechaUso: Date | null;
  idAdministrativo: number | null;
  idDocente: number | null;
}

interface RecuperacionContraseniaCreationAttributes extends InferCreationAttributes<RecuperacionContrasenia> {
  id: CreationOptional<number>;
  idUsuario: number;
  fechaExpiracion: Date;
  usado: boolean;
  fechaUso: Date | null;
  idAdministrativo: number | null;
  idDocente: number | null;
}

class RecuperacionContrasenia extends Model<RecuperacionContraseniaAttributes, RecuperacionContraseniaCreationAttributes> {
  declare id: CreationOptional<number>;
  declare idUsuario: number;
  declare fechaExpiracion: Date;
  declare usado: boolean;
  declare fechaUso: Date | null;
  declare idAdministrativo: number | null;
  declare idDocente: number | null;
}

RecuperacionContrasenia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_usuario",
      references: { model: "usuarios", key: "id" },
    },
    fechaExpiracion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "fecha_expiracion",
    },
    usado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fechaUso: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "fecha_uso",
    },
    idAdministrativo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "id_administrativo",
      references: { model: "administrativos", key: "id" },
    },
    idDocente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "id_docente",
      references: { model: "docentes", key: "id" },
    },
  },
  {
    sequelize,
    tableName: "recuperaciones_contrasenia",
    timestamps: false,
  }
);

export default RecuperacionContrasenia;