-- =============================================================================
-- SCRIPT DE CARGA INICIAL (SEED) – SISTEMA DE GESTIÓN ACADÉMICA
-- =============================================================================
-- Ajustes:
--  1. Reemplazá los hashes de contrasenia con valores generados con bcrypt.
--  2. Sequelize maneja las operaciones a nivel de aplicación. Al usar INSERT SQL, la base de datos simplemente guarda el valor que le das, sin pasar por los hooks del modelo.
--  2. El script supone que las tablas están vacías y que sequelize.sync() ya se ejecutó.
-- =============================================================================
-------------------------------
-- Poner el nombre de tu base de datos
-------------------------------
USE sigi_db;
-- ----------------------------
-- 1. Roles
-- ----------------------------
INSERT INTO roles (nombre, descripcion, createdAt, updatedAt)
VALUES ('Administrador', 'Acceso total al sistema', NOW(), NOW());

-- ----------------------------
-- 2. Administrativos
--    (el hash de contrasenia es 'Admin123!' – generá el tuyo con bcrypt y reemplazalo)
-- ----------------------------
-- Atención: el campo contrasenia guarda un hash, no texto plano.
-- Recomendación: ejecutar Node: bcrypt.hashSync('Admin123!', 10) y pegar el resultado.
INSERT INTO administrativos (nombre, apellido, email, dni, contrasenia, telefono, id_rol, activo, createdAt, updatedAt)
VALUES (
  'Juan', 'Pérez',
  'admin@instituto.edu.ar',
  '12345678',
  '$2b$10$r6Uw8C5F6j7u7WZ0IBHw3uO/0E2yb1KmqB4hBfj1Py0pSl.Z0sDbe',  -- HASH DE EJEMPLO (Admin123!)
  '1122334455',
  1, -- id_rol (Administrador)
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 3. Usuarios (alumno de prueba)
-- ----------------------------
INSERT INTO usuarios (nombre, apellido, email, contrasenia, activo, id_administrativo, createdAt, updatedAt)
VALUES (
  'María', 'González',
  'maria.gonzalez@email.com',
  '$2b$10$r6Uw8C5F6j7u7WZ0IBHw3uO/0E2yb1KmqB4hBfj1Py0pSl.Z0sDbe', -- mismo hash de ejemplo
  1,
  1, -- creado por admin
  NOW(), NOW()
);

-- ----------------------------
-- 4. Carrera
-- ----------------------------
INSERT INTO carreras (codigo, nombre, tipo, activo, id_administrativo, createdAt, updatedAt)
VALUES (
  'TSPW',
  'Tecnicatura Superior en Programación Web',
  'permanente',
  1,
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 5. Plan de Estudio
-- ----------------------------
INSERT INTO planes_estudios (version, fecha_de_aprobacion, fecha_de_cierre, duracion_en_anios, estado, id_carrera, id_administrativo, createdAt, updatedAt)
VALUES (
  '2022',
  '2022-03-15',
  '2027-03-15',
  3,
  'VIGENTE',
  1, -- id carrera
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 6. Docente
-- ----------------------------
INSERT INTO docentes (nombre, apellido, email, contrasenia, dni, titulo, especialidad, domicilio, telefono, id_administrativo, activo, fecha_de_alta, updatedAt)
VALUES (
  'Carlos', 'López',
  'carlos.lopez@instituto.edu.ar',
  '$2b$10$r6Uw8C5F6j7u7WZ0IBHw3uO/0E2yb1KmqB4hBfj1Py0pSl.Z0sDbe',
  '22445566',
  'Licenciado en Informática',
  'Desarrollo Web',
  'Av. Siempre Viva 123',
  '1155667788',
  1,
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 7. Ciclo Lectivo
-- ----------------------------
INSERT INTO ciclos_lectivos (anio, activo, fechaInicio, fechaFin, id_plan_estudio, id_administrativo, createdAt, updatedAt)
VALUES (
  2026,
  1,
  '2026-03-01',
  '2026-12-18',
  1, -- plan de estudio 1
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 8. Curso
-- ----------------------------
INSERT INTO cursos (cupo_estudiantes, anio_academico, id_ciclo_lectivo, id_administrativo, createdAt, updatedAt)
VALUES (
  30,
  1,
  1, -- ciclo lectivo 1
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 9. División
-- ----------------------------
INSERT INTO divisiones (id_docente, id_curso, id_administrativo, createdAt, updatedAt)
VALUES (
  1, -- docente Carlos
  1, -- curso 1
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 10. Unidad Curricular (materia)
-- ----------------------------
INSERT INTO unidades_curriculares (id_plan_estudio, nombre, duracion, cargaHoraria, cuatrimestre, id_administrativo, createdAt, updatedAt)
VALUES (
  1,
  'Introducción a la Programación',
  'cuatrimestral',
  120,
  'primero',
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 11. División x Unidad Curricular
-- ----------------------------
INSERT INTO divisiones_x_unidades_curriculares (id_division, id_unidad_curricular, id_administrativo, createdAt, updatedAt)
VALUES (
  1,
  1,
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 12. Designación Docente
-- ----------------------------
INSERT INTO designaciones_docentes (id_docente, id_division_x_unidad_curricular, id_ciclo_lectivo, turno, aula, horario, nroMAB, fechaAltaMAB, id_administrativo, fechaVtoMAB, activo, createdAt, updatedAt)
VALUES (
  1,                   -- docente Carlos
  1,                   -- división x UC 1
  1,                   -- ciclo lectivo 2026
  'Mañana',
  'A101',
  'Lunes 8:00-12:00',
  'MAB-001',
  '2026-02-15',
  1,
  '2027-02-15',
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 13. Estudiante
-- ----------------------------
INSERT INTO estudiantes (dni, nombre, apellido, email, trabaja, activo, id_usuario, id_administrativo, createdAt, updatedAt)
VALUES (
  33445566,
  'Lucía', 'Rodríguez',
  'lucia.rodriguez@email.com',
  0,
  1,
  1, -- usuario María (simplificado: el estudiante usa el mismo usuario)
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 14. Legajo
-- ----------------------------
INSERT INTO legajos (id_estudiante, numeroLegajo, id_plan_estudio, activo, id_administrativo, createdAt, updatedAt)
VALUES (
  1, -- estudiante Lucía
  1001,
  1, -- plan 2022
  1,
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 15. Inscripción Carrera (ventana de inscripción)
-- ----------------------------
INSERT INTO inscripciones_carreras (cupo, fecha_desde, fecha_hasta, id_plan_estudio, id_administrativo, createdAt, updatedAt)
VALUES (
  50,
  '2025-10-01',
  '2026-02-15',
  1,
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 16. Preinscripto
-- ----------------------------
INSERT INTO preinscriptos (id_inscripcion, id_usuario, fechaInscripcion, cus, isa, emmac, analitico, partida_nacimiento, foto, estado, id_administrativo, createdAt, updatedAt)
VALUES (
  1,               -- inscripción 1
  1,               -- usuario María
  '2026-01-10',
  'CUS-123',
  'ISA-456',
  NULL,
  'https://docs.google.com/analitico',
  'https://docs.google.com/partida',
  'https://fotos.com/lucia.jpg',
  'aprobado',
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 17. Estudiante x Unidad Curricular
-- ----------------------------
INSERT INTO estudiantes_x_unidades_curriculares (id_division_x_unidad_curricular, id_legajo, fecha_de_inscripcion, condicion, id_administrativo, createdAt, updatedAt)
VALUES (
  1,               -- división x UC 1
  1,               -- legajo 1001
  '2026-03-01',
  'regular',
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 18. Asistencia
-- ----------------------------
INSERT INTO asistencias (id_division_x_unidad_curricular, fecha, presente, id_legajo, id_administrativo, createdAt, updatedAt)
VALUES (
  1,
  '2026-03-08',
  1,
  1,
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 19. Instancia Evaluativa
-- ----------------------------
INSERT INTO instancias_evaluativas (id_division_x_unidad_curricular, descripcion, fecha, tipo, id_administrativo, createdAt, updatedAt)
VALUES (
  1,
  'Primer parcial de Introducción a la Programación',
  '2026-04-20',
  'parcial',
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 20. Legajo x Instancia Evaluativa
-- ----------------------------
INSERT INTO legajos_x_instancias_evaluativas (id_instancia_evaluativa, id_legajo, nota, fechaRegistro, id_administrativo, createdAt, updatedAt)
VALUES (
  1,
  1,
  8,
  '2026-04-25',
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 21. Turno Examen
-- ----------------------------
INSERT INTO turnos_examenes (descripcion, fecha_desde, fecha_hasta, id_ciclo_lectivo, id_administrativo, createdAt, updatedAt)
VALUES (
  'Julio-Agosto 2026',
  '2026-07-01',
  '2026-08-15',
  1,
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 22. Mesa de Examen
-- ----------------------------
INSERT INTO mesas_examenes (turno_examen_id, unidad_curricular_id, fecha, hora, id_docente_presidente, id_docente_vocal1, id_docente_vocal2, total_inscripto, total_aprobados, total_desaprobados, total_ausentes, tipo, activo, id_administrativo, createdAt, updatedAt)
VALUES (
  1,               -- turno julio-agosto
  1,               -- Introducción a la Programación
  '2026-07-10',
  '09:00',
  1,               -- Carlos López
  1,               -- misma persona (ejemplo simplificado)
  1,
  1, 1, 0, 0,
  'ORDINARIO',
  1,
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 23. Mesa de Examen x Legajo
-- ----------------------------
INSERT INTO mesas_examenes_x_legajos (id_mesa_examen, id_legajo, condicion, fecha_inscripcion, nota, resultado, id_administrativo, createdAt, updatedAt)
VALUES (
  1,
  1,
  'regular',
  '2026-07-05',
  9,
  'aprobado',
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 24. Movimiento Financiero
-- ----------------------------
INSERT INTO movimientos_financieros (id_estudiante, tipo, concepto, monto, fecha, medio_pago, descripcion, id_administrativo, createdAt, updatedAt)
VALUES (
  1,
  'INGRESO',
  'Matrícula 2026',
  5000,
  '2026-02-20',
  'Transferencia bancaria',
  'Pago por inscripción',
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 25. Comprobante Alumno
-- ----------------------------
INSERT INTO comprobantes_alumnos (id_movimiento_financiero, url_comprobante, concepto, fecha_carga, estado, fecha_confirmacion, id_administrativo)
VALUES (
  1,
  'https://comprobantes.edu.ar/matricula_lucia.pdf',
  'Comprobante matrícula',
  '2026-02-21',
  'VALIDADO',
  '2026-02-22',
  1
);

-- ----------------------------
-- 26. Correlatividad
-- ----------------------------
INSERT INTO correlatividades (id_unidad_curricular, id_unidad_curricular_correlativa, id_administrativo, createdAt, updatedAt)
VALUES (
  1,               -- Introducción a la Programación (requiere...)
  1,               -- ... a sí misma (solo a efectos de ejemplo)
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 27. Tipo Documento Requerido
-- ----------------------------
INSERT INTO tipos_documentos_requeridos (id_carrera, nombre_documento, obligatorio, es_critico, descripcion, dias_vigencia, id_administrativo, createdAt, updatedAt)
VALUES (
  1,
  'Analítico del secundario',
  1,
  1,
  'Certificado de estudios secundarios completos',
  365,
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 28. Documento Legajo
-- ----------------------------
INSERT INTO documentos_legajos (id_legajo, id_tipo_documento_requerido, id_usuario_carga, url_archivo, fecha_carga, fecha_vencimiento, estado, id_administrativo)
VALUES (
  1,
  1,
  1,               -- usuario María
  'https://documentos.edu.ar/analitico_lucia.pdf',
  '2026-01-15',
  '2027-01-15',
  'APROBADO',
  1
);

-- ----------------------------
-- 29. Dossier Institucional
-- ----------------------------
INSERT INTO dossiers_institucionales (id_carrera, titulo, seccion, contenido, url_archivo, tipo, estado, fecha_actualizacion, id_administrativo)
VALUES (
  1,
  'Reglamento de Prácticas',
  'Normativas',
  'El presente reglamento establece...',
  NULL,
  'NORMATIVA',
  1,
  NOW(),
  1
);

-- ----------------------------
-- 30. Información Extra
-- ----------------------------
INSERT INTO informacion_extra (titulo, icono, descripcion, id_carrera, createdAt, updatedAt)
VALUES (
  'Perfil del Egresado',
  '🎓',
  'El egresado de la Tecnicatura estará capacitado para...',
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 31. Cambio de Plan de Estudio
-- ----------------------------
INSERT INTO cambios_planes_estudios (id_legajo, id_plan_estudio_origen, id_plan_estudio_destino, id_usuario_gestor, fecha_solicitud, fecha_aprobacion, plazo_vencimiento, estado, observaciones, id_administrativo, createdAt, updatedAt)
VALUES (
  1,
  1,               -- origen plan 2022
  1,               -- destino plan 2022 (ejemplo de autosolicitud)
  1,               -- usuario María
  '2026-03-01',
  '2026-03-15',
  NULL,
  'APROBADO',
  'Cambio aprobado por readecuación',
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 32. Equivalencia de Unidades Curriculares
-- ----------------------------
INSERT INTO equivalencias_unidades_curriculares (id_plan_estudio_origen, id_plan_estudio_destino, id_unidad_curricular_origen, id_unidad_curricular_destino, tipo_equivalencia, observaciones, id_administrativo, createdAt, updatedAt)
VALUES (
  1, 1,
  1, 1,
  'TOTAL',
  'Equivalencia automática',
  1,
  NOW(), NOW()
);

-- ----------------------------
-- 33. Notificaciones
-- ----------------------------
INSERT INTO notificaciones (id_estudiante, id_docente, id_administrativo, titulo, mensaje, prioridad, leida, fecha_creacion)
VALUES (
  1,               -- Lucía
  NULL,
  1,
  'Bienvenida',
  'Bienvenida al ciclo 2026.',
  'media',
  0,
  '2026-03-01'
);

-- ----------------------------
-- 34. Recuperación de Contraseña
-- ----------------------------
INSERT INTO recuperaciones_contrasenias (id_usuario, fecha_expiracion, usado, fecha_uso, id_administrativo, id_docente)
VALUES (
  1,
  '2026-04-01',
  0,
  NULL,
  1,
  NULL
);

-- ----------------------------
-- 35. Sesión de Usuario
-- ----------------------------
INSERT INTO sesiones_usuarios (id_usuario, fecha_inicio_sesion, fecha_cierre_sesion, intento_fallido, bloqueado, id_administrativo, id_docente)
VALUES (
  1,
  '2026-03-01 08:30:00',
  '2026-03-01 12:00:00',
  0,
  0,
  1,
  NULL
);