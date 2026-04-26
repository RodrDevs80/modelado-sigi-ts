import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database/conexion.js";

interface CursoAttributes extends InferAttributes<Curso> {
    id: number;
    cupoEstudiantes: number | null;
    anioAcademico: number;
    idCicloLectivo: number;
    idAdministrativo: number;
}
interface CursoCreationAttributes extends InferCreationAttributes<Curso> {
    id: CreationOptional<number>;
    cupoEstudiantes: number | null;
    anioAcademico: number;
    idCicloLectivo: number;
    idAdministrativo: number;
}

class Curso extends Model<CursoAttributes, CursoCreationAttributes> {
    declare id: CreationOptional<number>;
    declare cupoEstudiantes: number | null;
    declare anioAcademico: number;
    declare idCicloLectivo: number;
    declare idAdministrativo: number;
}

Curso.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cupoEstudiantes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "cupo_estudiantes"
        },
        anioAcademico: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "anio_academico"
        },
        idCicloLectivo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "id_ciclo_lectivo",
            references: {
                model: "ciclos_lectivos",
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
        tableName: "cursos",
        timestamps: true,
        // Opcional: índices para optimizar consultas
        indexes: [
            { fields: ["anio_academico"] },
            { fields: ["id_ciclo_lectivo"] }
        ]
    }
)

export default Curso;