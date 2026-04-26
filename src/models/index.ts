import sequelize from "../config/database/conexion.js";

// Importar todos los modelos
import Administrativo from "./Administrativo.js";
import Asistencia from "./Asistencia.js";
import CambioPlanEstudio from "./CambioPlanEstudio.js";
import Carrera from "./Carrera.js";
import CicloLectivo from "./CicloLectivo.js";
import ComprobanteAlumno from "./ComprobanteAlumno.js";
import Correlatividad from "./Correlatividad.js";
import Curso from "./Curso.js";
import DesignacionesDocente from "./DesignacionDocente.js";
import Division from "./Division.js";
import DivisionXUnidadCurricular from "./DivisionXUnidadCurricular.js";
import Docente from "./Docente.js";
import DocumentoLegajo from "./DocumentoLegajo.js";
import DossierInstitucional from "./DossierInstitucional.js";
import EquivalenciaUnidadCurricular from "./EquivalenciaUnidadCurricular.js";
import Estudiante from "./Estudiante.js";
import EstudianteXUnidadCurricular from "./EstudianteXUnidadCurricular.js";
import InformacionExtra from "./InformacionExtra.js"; // ✅ NUEVO IMPORT
import InscripcionCarrera from "./InscripcionCarrera.js";
import InstanciaEvaluativa from "./InstanciaEvaluativa.js";
import Legajo from "./Legajo.js";
import LegajoXInstanciaEvaluativa from "./LegajoXInstanciaEvaluativa.js";
import MesaExamen from "./MesaExamen.js";
import MesaExamenXLegajo from "./MesaExamenXLegajo.js";
import MovimientoFinanciero from "./MovimientoFinanciero.js";
import Notificacion from "./Notificacion.js";
import PlanEstudio from "./PlanEstudio.js";
import Preinscripto from "./Preinscripto.js";
import RecuperacionContrasenia from "./RecuperacionContrasenia.js";
import Rol from "./Rol.js";
import SesionUsuario from "./SesionUsuario.js";
import TipoDocumentoRequerido from "./TipoDocumentoRequerido.js";
import TurnoExamen from "./TurnoExamen.js";
import UnidadCurricular from "./UnidadCurricular.js";
import Usuario from "./Usuario.js";

// Definir las asociaciones entre los modelos

// ---------- Rol ----------
Rol.hasMany(Administrativo, { foreignKey: "idRol" });
Administrativo.belongsTo(Rol, { foreignKey: "idRol" });

// ---------- Administrativo (es el creador/base de casi todo) ----------
Administrativo.hasMany(Asistencia, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(CambioPlanEstudio, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(Carrera, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(CicloLectivo, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(ComprobanteAlumno, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(Correlatividad, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(Curso, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(DesignacionesDocente, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(Division, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(DivisionXUnidadCurricular, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(Docente, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(DocumentoLegajo, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(DossierInstitucional, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(EquivalenciaUnidadCurricular, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(Estudiante, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(EstudianteXUnidadCurricular, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(InformacionExtra, { foreignKey: "idAdministrativo" }); // ✅ NUEVO
Administrativo.hasMany(InscripcionCarrera, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(InstanciaEvaluativa, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(Legajo, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(LegajoXInstanciaEvaluativa, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(MesaExamen, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(MesaExamenXLegajo, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(MovimientoFinanciero, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(Notificacion, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(PlanEstudio, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(Preinscripto, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(RecuperacionContrasenia, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(SesionUsuario, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(TipoDocumentoRequerido, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(TurnoExamen, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(UnidadCurricular, { foreignKey: "idAdministrativo" });
Administrativo.hasMany(Usuario, { foreignKey: "idAdministrativo" });

// belongsTo correspondientes
Asistencia.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
CambioPlanEstudio.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
Carrera.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
CicloLectivo.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
ComprobanteAlumno.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
Correlatividad.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
Curso.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
DesignacionesDocente.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
Division.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
DivisionXUnidadCurricular.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
Docente.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
DocumentoLegajo.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
DossierInstitucional.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
EquivalenciaUnidadCurricular.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
Estudiante.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
EstudianteXUnidadCurricular.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
InformacionExtra.belongsTo(Administrativo, { foreignKey: "idAdministrativo" }); // ✅ NUEVO
InscripcionCarrera.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
InstanciaEvaluativa.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
Legajo.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
LegajoXInstanciaEvaluativa.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
MesaExamen.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
MesaExamenXLegajo.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
MovimientoFinanciero.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
Notificacion.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
PlanEstudio.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
Preinscripto.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
RecuperacionContrasenia.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
SesionUsuario.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
TipoDocumentoRequerido.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
TurnoExamen.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
UnidadCurricular.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });
Usuario.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

// ---------- Usuario ----------
Usuario.hasMany(CambioPlanEstudio, { foreignKey: "idUsuarioGestor" });
Usuario.hasMany(DocumentoLegajo, { foreignKey: "idUsuarioCarga" });
Usuario.hasMany(Estudiante, { foreignKey: "idUsuario" });
Usuario.hasMany(Preinscripto, { foreignKey: "idUsuario" });
Usuario.hasMany(RecuperacionContrasenia, { foreignKey: "idUsuario" });
Usuario.hasMany(SesionUsuario, { foreignKey: "idUsuario" });

CambioPlanEstudio.belongsTo(Usuario, { foreignKey: "idUsuarioGestor" });
DocumentoLegajo.belongsTo(Usuario, { foreignKey: "idUsuarioCarga" });
Estudiante.belongsTo(Usuario, { foreignKey: "idUsuario" });
Preinscripto.belongsTo(Usuario, { foreignKey: "idUsuario" });
RecuperacionContrasenia.belongsTo(Usuario, { foreignKey: "idUsuario" });
SesionUsuario.belongsTo(Usuario, { foreignKey: "idUsuario" });

// ---------- Docente ----------
Docente.hasMany(DesignacionesDocente, { foreignKey: "idDocente" });
Docente.hasMany(Division, { foreignKey: "idDocente" });
Docente.hasMany(Notificacion, { foreignKey: "idDocente" });
Docente.hasMany(RecuperacionContrasenia, { foreignKey: "idDocente" });
Docente.hasMany(SesionUsuario, { foreignKey: "idDocente" });
Docente.hasMany(MesaExamen, { foreignKey: "idDocentePresidente", as: "MesasComoPresidente" });
Docente.hasMany(MesaExamen, { foreignKey: "idDocenteVocal1", as: "MesasComoVocal1" });
Docente.hasMany(MesaExamen, { foreignKey: "idDocenteVocal2", as: "MesasComoVocal2" });

DesignacionesDocente.belongsTo(Docente, { foreignKey: "idDocente" });
Division.belongsTo(Docente, { foreignKey: "idDocente" });
Notificacion.belongsTo(Docente, { foreignKey: "idDocente" });
RecuperacionContrasenia.belongsTo(Docente, { foreignKey: "idDocente" });
SesionUsuario.belongsTo(Docente, { foreignKey: "idDocente" });
MesaExamen.belongsTo(Docente, { foreignKey: "idDocentePresidente", as: "Presidente" });
MesaExamen.belongsTo(Docente, { foreignKey: "idDocenteVocal1", as: "Vocal1" });
MesaExamen.belongsTo(Docente, { foreignKey: "idDocenteVocal2", as: "Vocal2" });

// ---------- Estudiante ----------
Estudiante.hasMany(Legajo, { foreignKey: "idEstudiante" });
Estudiante.hasMany(MovimientoFinanciero, { foreignKey: "idEstudiante" });
Estudiante.hasMany(Notificacion, { foreignKey: "idEstudiante" });

Legajo.belongsTo(Estudiante, { foreignKey: "idEstudiante" });
MovimientoFinanciero.belongsTo(Estudiante, { foreignKey: "idEstudiante" });
Notificacion.belongsTo(Estudiante, { foreignKey: "idEstudiante" });

// ---------- Legajo ----------
Legajo.hasMany(Asistencia, { foreignKey: "idLegajo" });
Legajo.hasMany(CambioPlanEstudio, { foreignKey: "idLegajo" });
Legajo.hasMany(DocumentoLegajo, { foreignKey: "idLegajo" });
Legajo.hasMany(EstudianteXUnidadCurricular, { foreignKey: "idLegajo" });
Legajo.hasMany(LegajoXInstanciaEvaluativa, { foreignKey: "idLegajo" });
Legajo.hasMany(MesaExamenXLegajo, { foreignKey: "idLegajo" });

Asistencia.belongsTo(Legajo, { foreignKey: "idLegajo" });
CambioPlanEstudio.belongsTo(Legajo, { foreignKey: "idLegajo" });
DocumentoLegajo.belongsTo(Legajo, { foreignKey: "idLegajo" });
EstudianteXUnidadCurricular.belongsTo(Legajo, { foreignKey: "idLegajo" });
LegajoXInstanciaEvaluativa.belongsTo(Legajo, { foreignKey: "idLegajo" });
MesaExamenXLegajo.belongsTo(Legajo, { foreignKey: "idLegajo" });

// ---------- Carrera ----------
Carrera.hasMany(DossierInstitucional, { foreignKey: "idCarrera" });
Carrera.hasMany(PlanEstudio, { foreignKey: "idCarrera" });
Carrera.hasMany(TipoDocumentoRequerido, { foreignKey: "idCarrera" });
Carrera.hasMany(InformacionExtra, { foreignKey: "idCarrera" }); // ✅ NUEVO

DossierInstitucional.belongsTo(Carrera, { foreignKey: "idCarrera" });
PlanEstudio.belongsTo(Carrera, { foreignKey: "idCarrera" });
TipoDocumentoRequerido.belongsTo(Carrera, { foreignKey: "idCarrera" });
InformacionExtra.belongsTo(Carrera, { foreignKey: "idCarrera" }); // ✅ NUEVO

// ---------- PlanEstudio ----------
PlanEstudio.hasMany(CambioPlanEstudio, { foreignKey: "idPlanEstudioOrigen", as: "CambiosOrigen" });
PlanEstudio.hasMany(CambioPlanEstudio, { foreignKey: "idPlanEstudioDestino", as: "CambiosDestino" });
PlanEstudio.hasMany(EquivalenciaUnidadCurricular, { foreignKey: "idPlanEstudioOrigen", as: "EquivalenciasOrigen" });
PlanEstudio.hasMany(EquivalenciaUnidadCurricular, { foreignKey: "idPlanEstudioDestino", as: "EquivalenciasDestino" });
PlanEstudio.hasMany(InscripcionCarrera, { foreignKey: "idPlanEstudio" });
PlanEstudio.hasMany(Legajo, { foreignKey: "idPlanEstudio" });
PlanEstudio.hasMany(UnidadCurricular, { foreignKey: "idPlanEstudio" });

CambioPlanEstudio.belongsTo(PlanEstudio, { foreignKey: "idPlanEstudioOrigen", as: "PlanOrigen" });
CambioPlanEstudio.belongsTo(PlanEstudio, { foreignKey: "idPlanEstudioDestino", as: "PlanDestino" });
EquivalenciaUnidadCurricular.belongsTo(PlanEstudio, { foreignKey: "idPlanEstudioOrigen", as: "PlanOrigen" });
EquivalenciaUnidadCurricular.belongsTo(PlanEstudio, { foreignKey: "idPlanEstudioDestino", as: "PlanDestino" });
InscripcionCarrera.belongsTo(PlanEstudio, { foreignKey: "idPlanEstudio" });
Legajo.belongsTo(PlanEstudio, { foreignKey: "idPlanEstudio" });
UnidadCurricular.belongsTo(PlanEstudio, { foreignKey: "idPlanEstudio" });

// ---------- UnidadCurricular ----------
UnidadCurricular.hasMany(Correlatividad, { foreignKey: "idUnidadCurricular", as: "CorrelativasDirectas" });
UnidadCurricular.hasMany(Correlatividad, { foreignKey: "idUnidadUnidadCurricularCorrelativa", as: "CorrelativasInversas" });
UnidadCurricular.hasMany(DivisionXUnidadCurricular, { foreignKey: "idUnidadCurricular" });
UnidadCurricular.hasMany(EquivalenciaUnidadCurricular, { foreignKey: "idUnidadCurricularOrigen", as: "EquivalenciasOrigen" });
UnidadCurricular.hasMany(EquivalenciaUnidadCurricular, { foreignKey: "idUnidadCurricularDestino", as: "EquivalenciasDestino" });
UnidadCurricular.hasMany(MesaExamen, { foreignKey: "unidadCurricularId" });

Correlatividad.belongsTo(UnidadCurricular, { foreignKey: "idUnidadCurricular", as: "UnidadPrincipal" });
Correlatividad.belongsTo(UnidadCurricular, { foreignKey: "idUnidadUnidadCurricularCorrelativa", as: "UnidadCorrelativa" });
DivisionXUnidadCurricular.belongsTo(UnidadCurricular, { foreignKey: "idUnidadCurricular" });
EquivalenciaUnidadCurricular.belongsTo(UnidadCurricular, { foreignKey: "idUnidadCurricularOrigen", as: "UCOrigen" });
EquivalenciaUnidadCurricular.belongsTo(UnidadCurricular, { foreignKey: "idUnidadCurricularDestino", as: "UCDestino" });
MesaExamen.belongsTo(UnidadCurricular, { foreignKey: "unidadCurricularId" });

// ---------- Division ----------
Division.hasMany(DivisionXUnidadCurricular, { foreignKey: "idDivision" });

DivisionXUnidadCurricular.belongsTo(Division, { foreignKey: "idDivision" });

// ---------- DivisionXUnidadCurricular ----------
DivisionXUnidadCurricular.hasMany(Asistencia, { foreignKey: "idDivisionXUnidadCurricular" });
DivisionXUnidadCurricular.hasMany(DesignacionesDocente, { foreignKey: "idDivisionXUnidadCurricular" });
DivisionXUnidadCurricular.hasMany(EstudianteXUnidadCurricular, { foreignKey: "idDivisionXUnidadCurricular" });
DivisionXUnidadCurricular.hasMany(InstanciaEvaluativa, { foreignKey: "idDivisionXUnidadCurricular" });

Asistencia.belongsTo(DivisionXUnidadCurricular, { foreignKey: "idDivisionXUnidadCurricular" });
DesignacionesDocente.belongsTo(DivisionXUnidadCurricular, { foreignKey: "idDivisionXUnidadCurricular" });
EstudianteXUnidadCurricular.belongsTo(DivisionXUnidadCurricular, { foreignKey: "idDivisionXUnidadCurricular" });
InstanciaEvaluativa.belongsTo(DivisionXUnidadCurricular, { foreignKey: "idDivisionXUnidadCurricular" });

// ---------- Curso ----------
Curso.hasMany(Division, { foreignKey: "idCurso" });

Division.belongsTo(Curso, { foreignKey: "idCurso" });

// ---------- CicloLectivo ----------
CicloLectivo.hasMany(Curso, { foreignKey: "idCicloLectivo" });
CicloLectivo.hasMany(DesignacionesDocente, { foreignKey: "idCicloLectivo" });
CicloLectivo.hasMany(TurnoExamen, { foreignKey: "idCicloLectivo" });

Curso.belongsTo(CicloLectivo, { foreignKey: "idCicloLectivo" });
DesignacionesDocente.belongsTo(CicloLectivo, { foreignKey: "idCicloLectivo" });
TurnoExamen.belongsTo(CicloLectivo, { foreignKey: "idCicloLectivo" });

// ---------- TurnoExamen ----------
TurnoExamen.hasMany(MesaExamen, { foreignKey: "turnoExamenId" });

MesaExamen.belongsTo(TurnoExamen, { foreignKey: "turnoExamenId" });

// ---------- InstanciaEvaluativa ----------
InstanciaEvaluativa.hasMany(LegajoXInstanciaEvaluativa, { foreignKey: "idInstanciaEvaluativa" });

LegajoXInstanciaEvaluativa.belongsTo(InstanciaEvaluativa, { foreignKey: "idInstanciaEvaluativa" });

// ---------- MesaExamen ----------
MesaExamen.hasMany(MesaExamenXLegajo, { foreignKey: "idMesaExamen" });

MesaExamenXLegajo.belongsTo(MesaExamen, { foreignKey: "idMesaExamen" });

// ---------- InscripcionCarrera ----------
InscripcionCarrera.hasMany(Preinscripto, { foreignKey: "idInscripcionCarrera" });

Preinscripto.belongsTo(InscripcionCarrera, { foreignKey: "idInscripcionCarrera" });

// ---------- MovimientoFinanciero ----------
MovimientoFinanciero.hasMany(ComprobanteAlumno, { foreignKey: "idMovimientoFinanciero" });

ComprobanteAlumno.belongsTo(MovimientoFinanciero, { foreignKey: "idMovimientoFinanciero" });

// ---------- TipoDocumentoRequerido ----------
TipoDocumentoRequerido.hasMany(DocumentoLegajo, { foreignKey: "idTipoDocumentoRequerido" });

DocumentoLegajo.belongsTo(TipoDocumentoRequerido, { foreignKey: "idTipoDocumentoRequerido" });

export {
  sequelize,
  Administrativo,
  Asistencia,
  CambioPlanEstudio,
  Carrera,
  CicloLectivo,
  ComprobanteAlumno,
  Correlatividad,
  Curso,
  DesignacionesDocente,
  Division,
  DivisionXUnidadCurricular,
  Docente,
  DocumentoLegajo,
  DossierInstitucional,
  EquivalenciaUnidadCurricular,
  Estudiante,
  EstudianteXUnidadCurricular,
  InformacionExtra,
  InscripcionCarrera,
  InstanciaEvaluativa,
  Legajo,
  LegajoXInstanciaEvaluativa,
  MesaExamen,
  MesaExamenXLegajo,
  MovimientoFinanciero,
  Notificacion,
  PlanEstudio,
  Preinscripto,
  RecuperacionContrasenia,
  Rol,
  SesionUsuario,
  TipoDocumentoRequerido,
  TurnoExamen,
  UnidadCurricular,
  Usuario,
};