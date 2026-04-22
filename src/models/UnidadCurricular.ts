import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface UnidadCurricularAttributes extends InferAttributes<UnidadCurricular> {
  id: number;
  idPlanEstudio: number;
  nombre: string;
  //tipo: "asignatura" | "taller" | "seminario" | "modulo" | "proyecto" | "practica";
  duracion: "anual" | "cuatrimestral";
  cargaHoraria: number;
  cuatrimestre: "primero" | "segundo" | null;
  idAdministrativo: number;
}

interface UnidadCurricularCreationAttributes extends InferCreationAttributes<UnidadCurricular> {
  id: CreationOptional<number>;
  idPlanEstudio: number;
  nombre: string;
  //tipo: "asignatura" | "taller" | "seminario" | "modulo" | "proyecto" | "practica";
  duracion: "anual" | "cuatrimestral";
  cargaHoraria: number;
  cuatrimestre: "primero" | "segundo" | null;
  idAdministrativo: number;
}

class UnidadCurricular extends Model<UnidadCurricularAttributes, UnidadCurricularCreationAttributes> {
  declare id: CreationOptional<number>;
  declare idPlanEstudio: number;
  declare nombre: string;
  //declare tipo: "asignatura" | "taller" | "seminario" | "modulo" | "proyecto" | "practica";
  declare duracion: "anual" | "cuatrimestral";
  declare cargaHoraria: number;
  declare cuatrimestre: "primero" | "segundo" | null;
  declare idAdministrativo: number;
}

UnidadCurricular.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idPlanEstudio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_plan_estudio",
      references: {
        model: "plan_estudio",
        key: "id"
      }
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre es obligatorio" },
      },
    },
    // tipo: {
    //   type: DataTypes.ENUM("asignatura", "taller", "seminario", "modulo", "proyecto", "practica"),
    //   allowNull: false
    // },
    duracion: {
      type: DataTypes.ENUM("anual", "cuatrimestral"),
      allowNull: false
    },
    cargaHoraria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cuatrimestre: {
      type: DataTypes.ENUM("primero", "segundo"),
      allowNull: true
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
    tableName: "unidad_curricular",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
)


export default UnidadCurricular;
