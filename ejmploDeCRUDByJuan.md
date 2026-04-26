# Modelo de CRUD by Juan

# Archivos del módulo estudiantes

## modules/estudiantes/estudiante.routes.ts

````typescript
// modules/estudiantes/estudiante.routes.ts

import { Router } from "express";
import { estudianteController } from "./controller/estudiante.controller";
import { validateJwt } from "@/core/middlewares/validate-jwt.middleware";
import { validateRole } from "@/core/middlewares/validate-role.middleware";
import { Role } from "@/core/enums/role.enum";

// ─────────────────────────────────────────────────────────────────────────────
// INSTANCIA DEL ROUTER
// Se crea una instancia aislada de Express Router para este módulo.
// El prefijo base ('/estudiantes') NO se declara aquí: se asigna cuando
// este router se monta en app.ts, lo que permite reubicar el módulo sin
// tocar este archivo.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Router del módulo `estudiantes`.
 *
 * Este archivo es el **punto de entrada HTTP** del módulo: define qué verbos
 * y rutas están disponibles, qué middlewares los protegen y qué handler
 * del controlador los atiende.
 *
 * ### Cadena de middlewares por ruta
 * Cada ruta sigue el orden:
 * ```
 * [Autenticación] → [Autorización] → [Handler del Controlador]
 * ```
 * Los middlewares de validación de cuerpo (Zod) viven en el controlador,
 * no aquí, porque son parte de la lógica de entrada del handler.
 *
 * @see {@link estudianteController}  Handlers que atienden cada ruta.
 * @see README-routes.md              Documentación de arquitectura de este archivo.
 */
export const estudianteRouter = Router();

// ─────────────────────────────────────────────────────────────────────────────
// RUTAS DE SOLO LECTURA
// Protegidas con autenticación JWT. Cualquier usuario autenticado puede
// leer la lista o el detalle; no se requiere un rol específico.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Recupera el listado completo de estudiantes.
 *
 * @route   `GET /estudiantes`
 * @access  Privado — requiere token JWT válido.
 *
 * @middleware `validateJwt` — Verifica firma y expiración del token.
 *
 * @returns 200 `{ status: 'success', data: Estudiante[] }`
 */
estudianteRouter.get("/", validateJwt, estudianteController.getAll);

/**
 * Recupera un estudiante por su ID.
 *
 * @route   `GET /estudiantes/:id`
 * @access  Privado — requiere token JWT válido.
 *
 * @middleware `validateJwt` — Verifica firma y expiración del token.
 *
 * @returns 200 `{ status: 'success', data: Estudiante }`
 * @returns 400 Si `:id` no es un entero positivo.
 * @returns 404 Si no existe un estudiante con ese `id`.
 */
estudianteRouter.get("/:id", validateJwt, estudianteController.getById);

// ─────────────────────────────────────────────────────────────────────────────
// RUTAS DE ESCRITURA
// Protegidas con autenticación JWT + autorización por rol.
// Solo usuarios con el rol ADMIN o SECRETARIA pueden mutar datos de estudiantes.
// Separar las rutas de lectura de las de escritura hace visible de un vistazo
// qué operaciones requieren privilegios elevados.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Crea un nuevo estudiante.
 *
 * @route   `POST /estudiantes`
 * @access  Privado — requiere JWT válido + rol `ADMIN` o `SECRETARIA`.
 *
 * @middleware `validateJwt`                        — Verifica el token.
 * @middleware `validateRole(Role.ADMIN, Role.SECRETARIA)` — Verifica el rol.
 *
 * @body    `CreateEstudianteDto` — Ver `dto/create-estudiante.dto.ts`.
 *
 * @returns 201 `{ status: 'success', data: Estudiante }` + header `Location`.
 * @returns 400 Si el body no cumple el esquema de validación Zod.
 * @returns 403 Si el usuario no tiene el rol requerido.
 */
estudianteRouter.post(
  "/",
  validateJwt,
  validateRole(Role.ADMIN, Role.SECRETARIA),
  estudianteController.create
);

/**
 * Actualiza parcialmente un estudiante existente.
 *
 * Se usa PATCH (no PUT) porque el DTO de actualización acepta campos
 * parciales. Ver `dto/update-estudiante.dto.ts` y la sección §5 del README
 * del controlador para el razonamiento completo.
 *
 * @route   `PATCH /estudiantes/:id`
 * @access  Privado — requiere JWT válido + rol `ADMIN` o `SECRETARIA`.
 *
 * @middleware `validateJwt`                        — Verifica el token.
 * @middleware `validateRole(Role.ADMIN, Role.SECRETARIA)` — Verifica el rol.
 *
 * @body    `UpdateEstudianteDto` — Ver `dto/update-estudiante.dto.ts`.
 *
 * @returns 200 `{ status: 'success', data: Estudiante }` actualizado.
 * @returns 400 Si `:id` inválido o body no cumple el esquema.
 * @returns 403 Si el usuario no tiene el rol requerido.
 * @returns 404 Si no existe un estudiante con ese `id`.
 */
estudianteRouter.patch(
  "/:id",
  validateJwt,
  validateRole(Role.ADMIN, Role.SECRETARIA),
  estudianteController.update
);

/**
 * Elimina un estudiante por ID.
 *
 * Esta operación está restringida exclusivamente al rol `ADMIN` porque la
 * eliminación es irreversible (o activa un soft-delete con consecuencias en
 * todo el sistema). La `SECRETARIA` puede crear y editar, pero no eliminar.
 *
 * @route   `DELETE /estudiantes/:id`
 * @access  Privado — requiere JWT válido + rol `ADMIN`.
 *
 * @middleware `validateJwt`          — Verifica el token.
 * @middleware `validateRole(Role.ADMIN)` — Solo ADMIN puede eliminar.
 *
 * @returns 204 Sin body — eliminación exitosa.
 * @returns 400 Si `:id` no es un entero positivo.
 * @returns 403 Si el usuario no tiene el rol requerido.
 * @returns 404 Si no existe un estudiante con ese `id`.
 */
estudianteRouter.delete(
  "/:id",
  validateJwt,
  validateRole(Role.ADMIN),
  estudianteController.delete
);
````

## modules/estudiantes/controller/estudiante.controller.ts

```typescript
// modules/estudiantes/controller/estudiante.controller.ts

import { Request, Response, NextFunction } from "express";
import { estudianteService } from "../service/estudiante.service";
import { CreateEstudianteDto } from "../dto/create-estudiante.dto";
import { UpdateEstudianteDto } from "../dto/update-estudiante.dto";
import type { ZodError } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS PRIVADOS DEL MÓDULO
// Funciones utilitarias de alcance de archivo (no exportadas).
// Al extraerlas del objeto controlador evitamos que sean visibles en la
// interfaz pública del adaptador y facilitamos su reutilización interna.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Parsea y valida el parámetro `id` proveniente de la URL.
 *
 * Los parámetros de ruta en Express siempre son `string`. Esta función
 * centraliza la conversión y validación para que todos los handlers
 * apliquen exactamente la misma regla sin duplicar código.
 *
 * @param value - String crudo de `req.params.id`.
 * @returns Entero positivo, o `null` si el valor es inválido.
 *
 * @example
 * parseId('42')   // → 42
 * parseId('0')    // → null  (0 no es un PK válido)
 * parseId('abc')  // → null
 * parseId('')     // → null  (Number('') === 0)
 */
function parseId(value: string): number | null {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

/**
 * Responde con HTTP 400 adjuntando los errores de validación de Zod.
 *
 * `flatten().fieldErrors` transforma el árbol de errores Zod en un objeto
 * plano `{ campo: string[] }`, que los clientes (formularios React,
 * apps móviles) pueden mapear directamente sin transformación adicional.
 *
 * @param res   - Objeto Response de Express.
 * @param error - Instancia de ZodError producida por `.safeParse()`.
 */
function respondZodError(res: Response, error: ZodError): void {
  res.status(400).json({
    status: "error",
    message: "Datos de entrada inválidos.",
    errors: error.flatten().fieldErrors,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLADOR
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Adaptador de entrada HTTP para la entidad `Estudiante`.
 *
 * ### Responsabilidad única
 * Este objeto **solo** traduce peticiones HTTP en llamadas al servicio de
 * dominio y convierte la respuesta del servicio en una respuesta HTTP con el
 * código de estado correcto. No contiene lógica de negocio ni accede
 * directamente a la base de datos.
 *
 * ### Relación con la Arquitectura Hexagonal
 * Actúa como un **Adapter de entrada (Driving Adapter)** que implementa el
 * contrato de comunicación HTTP. Invoca a `estudianteService`, que representa
 * el **Puerto de aplicación** del dominio.
 *
 * @see {@link estudianteService} Puerto de aplicación que este adaptador conduce.
 * @see README.md Documentación de arquitectura y convenciones del módulo.
 */
export const estudianteController = {
  // ───────────────────────────────────────────────────────────────────────────
  // GET /estudiantes
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * Recupera el listado completo de estudiantes.
   *
   * @route  `GET /estudiantes`
   * @access Privado – debe ser protegido por middleware de autenticación en
   *         el router, no aquí (respetar SRP del controlador).
   *
   * @returns 200 `{ status, data: Estudiante[] }`
   */
  getAll: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const estudiantes = await estudianteService.getAll();

      // Envío explícito de 200 para mantener consistencia y legibilidad
      // en todos los handlers, aunque sea el código por defecto de Express.
      res.status(200).json({
        status: "success",
        data: estudiantes,
      });
    } catch (err) {
      // Delegamos al middleware de errores centralizado para no duplicar
      // lógica de logging ni formato de respuesta de error en cada handler.
      next(err);
    }
  },

  // ───────────────────────────────────────────────────────────────────────────
  // GET /estudiantes/:id
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * Recupera un único estudiante por su identificador primario.
   *
   * Cuando el servicio no encuentra el registro, responde **404** en lugar de
   * devolver `null` o `[]`, cumpliendo la semántica REST: un recurso que no
   * existe produce "Not Found", no un resultado vacío exitoso.
   *
   * @route   `GET /estudiantes/:id`
   * @param   req.params.id - Entero positivo (PK de la tabla).
   *
   * @returns 200 `{ status, data: Estudiante }`
   * @returns 400 Si `id` no es un entero positivo.
   * @returns 404 Si no existe un estudiante con ese `id`.
   */
  getById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = parseId(req.params.id);

      if (id === null) {
        // Respuesta síncrona: no hay I/O involucrado, next(err) sería overhead innecesario.
        res.status(400).json({
          status: "error",
          message: 'El parámetro "id" debe ser un entero positivo.',
        });
        return;
      }

      const estudiante = await estudianteService.getById(id);

      if (!estudiante) {
        // "No encontrado" es un resultado válido del dominio, no un error del sistema.
        // Por eso respondemos directamente en lugar de lanzar una excepción hacia next().
        res.status(404).json({
          status: "error",
          message: `No se encontró ningún estudiante con id ${id}.`,
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: estudiante,
      });
    } catch (err) {
      next(err);
    }
  },

  // ───────────────────────────────────────────────────────────────────────────
  // POST /estudiantes
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * Crea un nuevo estudiante.
   *
   * La validación con Zod ocurre **antes** de invocar al servicio: si el body
   * es inválido el controlador responde 400 sin que datos malformados lleguen
   * nunca a la capa de dominio.
   *
   * El header `Location` en la respuesta 201 indica la URL canónica del
   * recurso recién creado (convención REST/RFC 7231 §6.3.2).
   *
   * @route  `POST /estudiantes`
   * @body   {@link CreateEstudianteDto} – Esquema Zod con los campos requeridos.
   *
   * @returns 201 `{ status, data: Estudiante }` + header `Location`.
   * @returns 400 Si el body no cumple el esquema `CreateEstudianteDto`.
   */
  create: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const parsed = CreateEstudianteDto.safeParse(req.body);

      if (!parsed.success) {
        respondZodError(res, parsed.error);
        return;
      }

      // `parsed.data` está tipado por TypeScript según el esquema Zod:
      // el servicio nunca recibe un shape incorrecto, ni en runtime ni en compilación.
      const nuevoEstudiante = await estudianteService.create(parsed.data);

      res.status(201).location(`/estudiantes/${nuevoEstudiante.id}`).json({
        status: "success",
        data: nuevoEstudiante,
      });
    } catch (err) {
      next(err);
    }
  },

  // ───────────────────────────────────────────────────────────────────────────
  // PATCH /estudiantes/:id
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * Actualiza parcialmente un estudiante existente.
   *
   * Se usa **PATCH** y no PUT porque `UpdateEstudianteDto` es el esquema
   * `CreateEstudianteDto.partial()` de Zod: todos los campos son opcionales.
   * PUT semánticamente exige la representación completa del recurso, lo que
   * sería más restrictivo e incómodo para el cliente.
   *
   * @route  `PATCH /estudiantes/:id`
   * @param  req.params.id - Entero positivo.
   * @body   {@link UpdateEstudianteDto} – Subconjunto parcial de campos.
   *
   * @returns 200 `{ status, data: Estudiante }` con el registro actualizado.
   * @returns 400 Si `id` inválido o body no cumple `UpdateEstudianteDto`.
   * @returns 404 Si no existe un estudiante con ese `id`.
   */
  update: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = parseId(req.params.id);

      if (id === null) {
        res.status(400).json({
          status: "error",
          message: 'El parámetro "id" debe ser un entero positivo.',
        });
        return;
      }

      const parsed = UpdateEstudianteDto.safeParse(req.body);

      if (!parsed.success) {
        respondZodError(res, parsed.error);
        return;
      }

      // El servicio es responsable de verificar la existencia del registro
      // y retorna null si no lo encuentra, manteniendo el dominio desacoplado
      // del protocolo HTTP.
      const actualizado = await estudianteService.update(id, parsed.data);

      if (!actualizado) {
        res.status(404).json({
          status: "error",
          message: `No se encontró ningún estudiante con id ${id}.`,
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: actualizado,
      });
    } catch (err) {
      next(err);
    }
  },

  // ───────────────────────────────────────────────────────────────────────────
  // DELETE /estudiantes/:id
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * Elimina un estudiante por ID.
   *
   * Responde **204 No Content** en caso de éxito: tras eliminar el recurso no
   * existe representación que devolver (RFC 7231 §6.3.5). Enviar un body en
   * un 204 viola el estándar HTTP y puede confundir a algunos clientes.
   *
   * @route  `DELETE /estudiantes/:id`
   * @param  req.params.id - Entero positivo.
   *
   * @returns 204 Sin body – eliminación exitosa.
   * @returns 400 Si `id` inválido.
   * @returns 404 Si no existe un estudiante con ese `id`.
   */
  delete: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = parseId(req.params.id);

      if (id === null) {
        res.status(400).json({
          status: "error",
          message: 'El parámetro "id" debe ser un entero positivo.',
        });
        return;
      }

      const eliminado = await estudianteService.delete(id);

      if (!eliminado) {
        res.status(404).json({
          status: "error",
          message: `No se encontró ningún estudiante con id ${id}.`,
        });
        return;
      }

      // 204: recurso eliminado. `.send()` envía la respuesta sin body.
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
```
