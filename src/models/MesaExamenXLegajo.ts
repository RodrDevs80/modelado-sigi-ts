import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface MesaExamenXLegajoAttributes extends InferAttributes<MesaExamenXLegajo> {
  id: number;
  idMesaExamen: number;
  idLegajo: number;
  condicion: "regular" | "libre";
  fechaInscripcion: Date;
  nota_oral: number;
  nota_escrita: number;
  nota_final: number;
  resultado: "aprobado" | "desaprobado" | "ausente";
  idAdministrativo: number;
}

interface MesaExamenXLegajoCreationAttributes extends InferCreationAttributes<MesaExamenXLegajo> {
  id: CreationOptional<number>;
  idMesaExamen: number;
  idLegajo: number;
  condicion: "regular" | "libre";
  fechaInscripcion: Date;
  nota_oral: number;
  nota_escrita: number;
  nota_final: number;
  resultado: "aprobado" | "desaprobado" | "ausente";
  idAdministrativo: number;
}

class MesaExamenXLegajo extends Model<MesaExamenXLegajoAttributes, MesaExamenXLegajoCreationAttributes> {
  declare id: CreationOptional<number>;
  declare idMesaExamen: number;
  declare idLegajo: number;
  declare condicion: "regular" | "libre";
  declare fechaInscripcion: Date;
  declare nota_oral: number;
  declare nota_escrita: number;
  declare nota_final: number;
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
      field: "fecha_inscripcion",
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
    nota_oral: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nota_escrita: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nota_final: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: "mesas_examenes_x_legajos",
    timestamps: true,
    // Opcional: índices para optimizar consultas
    indexes: [
      { fields: ["id_mesa_examen"] },
      { fields: ["id_legajo"] },
      { fields: ["fecha_inscripcion"] },
      { fields: ["condicion"] },
      { fields: ["resultado"] },
      { fields: ["id_administrativo"] }
    ]
  }
)


export default MesaExamenXLegajo;