import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface CorrelatividadAttributes extends InferAttributes<Correlatividad> {
  id: number;
  idUnidadCurricular: number;
  idUnidadUnidadCurricularCorrelativa: number;
  idAdministrativo: number;
}

interface CorrelatividadCreationAttributes extends InferCreationAttributes<Correlatividad> {
  id: CreationOptional<number>;
  idUnidadCurricular: number;
  idUnidadUnidadCurricularCorrelativa: number;
  idAdministrativo: number;
}

class Correlatividad extends Model<CorrelatividadAttributes, CorrelatividadCreationAttributes> {
  declare id: CreationOptional<number>;
  declare idUnidadCurricular: number;
  declare idUnidadUnidadCurricularCorrelativa: number;
  declare idAdministrativo: number;
}

Correlatividad.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idUnidadCurricular: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_unidad_curricular",
      references: {
        model: "unidades_curriculares",
        key: "id"
      }
    },
    idUnidadUnidadCurricularCorrelativa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_unidad_curricular_correlativa",
      references: {
        model: "unidades_curriculares",
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
    tableName: "correlatividades",
    timestamps: true,
    // Opcional: índice único para evitar duplicados
    indexes: [{ unique: true, fields: ["id_unidad_curricular", "id_unidad_curricular_correlativa"] }]
  }
)

export default Correlatividad;