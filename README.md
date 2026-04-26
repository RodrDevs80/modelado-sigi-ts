# back – Sistema de Gestión Académica (backend)

API REST para un sistema integral de gestión académica, desarrollado con **Node.js**, **Express**, **TypeScript** y **Sequelize** (MySQL).  
Permite administrar carreras, planes de estudio, ciclos lectivos, docentes, estudiantes, legajos, asistencias, exámenes, inscripciones y mucho más.

---

## 🚀 Tecnologías

- **Runtime:** Node.js (≥18)
- **Lenguaje:** TypeScript 5
- **Framework:** Express 5
- **ORM:** Sequelize 6
- **Base de datos:** MySQL (con mysql2)
- **Autenticación:** bcrypt (hash de contraseñas)
- **Herramientas:** tsx, morgan, cors, dotenv

---

## 📦 Requisitos previos

1. **Node.js** instalado (versión 18 o superior recomendada).
2. **MySQL** corriendo localmente o en un servidor accesible.
3. Crear una base de datos vacía (por ejemplo `sistema_academico`).

---

## ⚙️ Instalación

```bash
# Clonar el repositorio (si aplica)
git clone <url-del-repo>
cd back

# Instalar dependencias
npm install
```

---

## 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes claves:

```env
DB_NAME=nombre_de_tu_base
DB_USER_M=usuario
DB_PASSWORD=contraseña
DB_HOST=localhost
DB_DIALECT_M=mysql

PORT=4000  # opcional, defecto 4000
```

Asegurate de que las credenciales correspondan a tu instancia MySQL.

---

## ▶️ Ejecución

### Modo desarrollo (con recarga automática)

```bash
npm run dev
```

### Compilar a JavaScript

```bash
npm run build
```

### Ejecutar en producción

```bash
npm start
```

El servidor se levantará en `http://localhost:4000` (o el puerto definido en `.env`).  
Ruta de prueba: **GET** `/health`

---

## 📂 Estructura del proyecto

```
src/
├── config/
│   └── database/
│       ├── configDataBase.ts   # Lectura de variables de entorno
│       └── conexion.ts         # Instancia de Sequelize
├── models/                     # Modelos Sequelize (uno por archivo)
│   ├── index.ts                # Definición de asociaciones y exportación centralizada
│   ├── Administrativo.ts
│   ├── Docente.ts
│   ├── Estudiante.ts
│   ├── Carrera.ts
│   ├── PlanEstudio.ts
│   ├── ...                     # +30 modelos
├── index.ts                    # Punto de entrada: configura Express y sincroniza BD
├── package.json
└── tsconfig.json
```

---

## 📋 Modelos del sistema

Se implementa un esquema completo de gestión académica con las siguientes entidades principales:

- **Actores:** `Administrativo`, `Docente`, `Estudiante`, `Usuario`
- **Académico:** `Carrera`, `PlanEstudio`, `UnidadCurricular`, `CicloLectivo`, `Curso`, `Division`
- **Matriculación:** `InscripcionCarrera`, `Legajo`, `Preinscripto`
- **Seguimiento:** `Asistencia`, `InstanciaEvaluativa`, `MesaExamen`, `EstudianteXUnidadCurricular`
- **Financiero:** `MovimientoFinanciero`, `ComprobanteAlumno`
- **Sistema:** `Rol`, `SesionUsuario`, `Notificacion`, `RecuperacionContrasenia`

Todas las asociaciones (`hasMany`, `belongsTo`) están definidas en `src/models/index.ts`.  
Se utilizan nombres de columna en snake_case con la propiedad `field` cuando es necesario.

---

## 🛑 Ajustes importantes

### Sincronización de modelos

En `src/index.ts` se utiliza `sequelize.sync({ force: false })`.  
Esto **no elimina tablas existentes**. Si necesitás reiniciar la base de datos (⚠️ peligroso), cambiá `force` a `true` solo en entorno de pruebas.

### Nombres de índices

Algunos índices compuestos generaban nombres demasiado largos para MySQL (límite 64 caracteres).  
Se solucionó agregando la propiedad `name` en los índices de los siguientes modelos:

- `Correlatividad`
- `Asistencia`
- `EstudianteXUnidadCurricular`
- `InstanciaEvaluativa`

Si agregás nuevos índices largos, recordá asignar un `name` corto para evitar errores.

### Hooks de contraseña

Los modelos que manejan autenticación (`Administrativo`, `Docente`, `Usuario`) incluyen hooks de `beforeCreate` y `beforeUpdate` que hashean automáticamente el campo `contrasenia` usando **bcrypt**.

---

## 📄 Licencia

ISC

---

## ✨ Endpoints

Actualmente la API solo expone un health check:

```
GET /health
```

Pronto se añadirán las rutas CRUD para cada entidad y la lógica de negocio correspondiente.

---

¿Preguntas o sugerencias? Abrí un issue o contactá al equipo de desarrollo.
