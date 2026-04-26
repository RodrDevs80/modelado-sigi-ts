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

## 🗄️ Inicialización de la base de datos

### Opción A: Sincronización automática (Sequelize)

Al ejecutar `npm run dev` o `npm start`, Sequelize creará las tablas automáticamente según los modelos definidos.  
Esto se controla en `src/index.ts` con:

```ts
await sequelize.sync({ force: false }); // false = no borra tablas existentes
```

Si necesitas recrear todas las tablas (⚠️ solo en desarrollo), cambia a `{ force: true }`.

### Opción B: Script SQL manual (con datos de prueba)

Dentro de la carpeta `mock/` se encuentra el archivo `datos.sql`, que contiene sentencias `INSERT` para poblar la base con información de prueba.

**Pasos para ejecutarlo:**

1. Asegúrate de que las tablas ya estén creadas (puedes ejecutar primero `npm run dev` para que Sequelize las genere).
2. Conéctate a tu base de datos (por ejemplo, usando MySQL Workbench, phpMyAdmin o la línea de comandos).
3. Ejecuta el script completo:

```sql
source mock/datos.sql;
```

O copia el contenido y ejecútalo en tu cliente SQL.

> **Nota:** El script ya respeta el orden de las dependencias (primero roles, luego administrativos, etc.). Si cambias el orden, podrías violar restricciones de clave foránea.

---

## 🔄 Orden recomendado para insertar datos desde la aplicación (o vía API)

Para evitar errores de `foreign key constraint fails`, cualquier proceso que inserte registros debe seguir este orden lógico. Los números indican la secuencia correcta:

1. **`Rol`** – Los roles deben existir antes que los administrativos.
2. **`Administrativo`** – Es el usuario administrador del sistema; muchos otros modelos lo referencian.
3. **`Usuario`** – Para los estudiantes o preinscriptos.
4. **`Carrera`** – Las carreras son independientes de otros registros.
5. **`PlanEstudio`** – Depende de `Carrera`.
6. **`Docente`** – Puede insertarse en cualquier momento después de `Administrativo`.
7. **`CicloLectivo`** – Necesita `PlanEstudio` y `Administrativo`.
8. **`Curso`** – Requiere `CicloLectivo`.
9. **`Division`** – Depende de `Curso` y `Docente`.
10. **`UnidadCurricular`** – Depende de `PlanEstudio`.
11. **`DivisionXUnidadCurricular`** – Necesita `Division` y `UnidadCurricular`.
12. **`Estudiante`** – Requiere `Usuario` y `Administrativo`.
13. **`Legajo`** – Depende de `Estudiante` y `PlanEstudio`.
14. **`InscripcionCarrera`** – Necesita `PlanEstudio`.
15. **`Preinscripto`** – Depende de `InscripcionCarrera` y `Usuario`.
16. **`EstudianteXUnidadCurricular`** – Requiere `DivisionXUnidadCurricular` y `Legajo`.
17. **`Asistencia`** – Depende de `DivisionXUnidadCurricular` y `Legajo`.
18. **`InstanciaEvaluativa`** – Necesita `DivisionXUnidadCurricular`.
19. **`LegajoXInstanciaEvaluativa`** – Depende de `InstanciaEvaluativa` y `Legajo`.
20. **`TurnoExamen`** – Requiere `CicloLectivo`.
21. **`MesaExamen`** – Depende de `TurnoExamen`, `UnidadCurricular` y `Docente`.
22. **`MesaExamenXLegajo`** – Necesita `MesaExamen` y `Legajo`.
23. **`MovimientoFinanciero`** – Depende de `Estudiante`.
24. **`ComprobanteAlumno`** – Requiere `MovimientoFinanciero`.
25. **`Correlatividad`** – Depende de `UnidadCurricular`.
26. **`TipoDocumentoRequerido`** – Necesita `Carrera`.
27. **`DocumentoLegajo`** – Depende de `Legajo`, `TipoDocumentoRequerido` y `Usuario`.
28. **`DossierInstitucional`** – Requiere `Carrera`.
29. **`InformacionExtra`** – Depende de `Carrera`.
30. **`CambioPlanEstudio`** – Necesita `Legajo`, `PlanEstudio` (origen/destino) y `Usuario`.
31. **`EquivalenciaUnidadCurricular`** – Depende de `PlanEstudio` y `UnidadCurricular`.
32. **`Notificacion`** – Puede insertarse al final (referencia a `Estudiante` o `Docente`).
33. **`RecuperacionContrasenia`** – Necesita `Usuario` (y opcionalmente `Administrativo`/`Docente`).
34. **`SesionUsuario`** – Requiere `Usuario` (y opcionalmente `Administrativo`/`Docente`).

Si tu aplicación expone endpoints para cada entidad, asegúrate de que el frontend o el cliente API siga este orden al crear registros en cascada.

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
