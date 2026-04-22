import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface MesaExamenXLegajoAttributes extends InferAttributes<MesaExamenXLegajo> {
  id: number;
  idMesaExamen: number;
  idLegajo: number;
  condicion: "regular" | "libre";
  fechaInscripcion: Date;
  nota: number | null;
  resultado: "aprobado" | "desaprobado" | "ausente";
  idAdministrativo: number;
}

interface MesaExamenXLegajoCreationAttributes extends InferCreationAttributes<MesaExamenXLegajo> {
  id: CreationOptional<number>;
  idMesaExamen: number;
  idLegajo: number;
  condicion: "regular" | "libre";
  fechaInscripcion: Date;
  nota: number | null;
  resultado: "aprobado" | "desaprobado" | "ausente";
  idAdministrativo: number;
}

class MesaExamenXLegajo extends Model<MesaExamenXLegajoAttributes, MesaExamenXLegajoCreationAttributes> {
  declare id: CreationOptional<number>;
  declare idMesaExamen: number;
  declare idLegajo: number;
  declare condicion: "regular" | "libre";
  declare fechaInscripcion: Date;
  declare nota: number | null;
  declare resultado: "aprobado" | "desaprobado" | "ausente";
  declare idAdministrativo: number;
}

MesaExamenXLegajo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idMesaExamen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_mesa_examen",
      references: {
        model: "mesas_examenes",
        key: "id"
      }
    },
    idLegajo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_legajo",
      references: {
        model: "legajos",
        key: "id"
      }
    },
    condicion: {
      type: DataTypes.ENUM("regular", "libre"),
      allowNull: false
    },
    fechaInscripcion: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        //validar la fecha
        notBeforeToday(value: Date) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (value < today) {
            throw new Error('La fecha no puede ser anterior a la fecha actual.');
          }
        }
      }
    },
    nota: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    resultado: {
      type: DataTypes.ENUM("aprobado", "desaprobado", "ausente")
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
    tableName: "mesas_examen_x_legajo",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion"
  }
)


export default MesaExamenXLegajo;