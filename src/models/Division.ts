import { DataType, Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface DivisionAttributes extends InferAttributes<Division> {
  id: number;
  idDocente: number;
  idCurso: number;
  idAdministrativo: number;
}
interface DivisionCreationAttributes extends InferCreationAttributes<Division> {
  id: CreationOptional<number>;
  idDocente: number;
  idCurso: number;
  idAdministrativo: number;
}

class Division extends Model<DivisionAttributes, DivisionCreationAttributes> {
  declare id: CreationOptional<number>;
  declare idDocente: number;
  declare idCurso: number;
  declare idAdministrativo: number;
}

Division.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idDocente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_docente",
      references: {
        model: "docentes",
        key: "id"
      }
    },
    idCurso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_curso",
      references: {
        model: "cursos",
        key: "id"
      }
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
    tableName: "divisiones",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion"
  }
)

export default Division;