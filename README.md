# 🧠 Academic Online - Evaluación Técnica

Este proyecto es una plataforma educativa donde los usuarios pueden registrarse, iniciar sesión, completar una evaluación técnica, ver resultados detallados y generar un PDF con su puntuación y desempeño.

Construido con **Next.js 15**, siguiendo principios de arquitectura limpia, separación de responsabilidades y buenas prácticas fullstack.

---

## 🚀 Instalación y Ejecución Local

```bash
# Clonar el repositorio
git clone https://github.com/MrLuis-WebMaster/app-academic-online
cd app-academic-online

# Instalar dependencias
npm install

# Crear un archivo de entorno
cp .env.example .env.local
# (Edita JWT_SECRET si lo deseas)

# Iniciar servidor de desarrollo
npm run dev

# Accede en el navegador
http://localhost:3000
```

📦 Requiere Node.js 18+.

---

## 🎯 Funcionalidades

- Registro y login con validación de formularios
- Middleware para proteger rutas y endpoints con JWT
- Evaluación de 10 preguntas con progreso y control de tiempo
- Resultados detallados con retroalimentación
- Generación de PDF con el resumen del assessment
- Gestión del estado del usuario con `localStorage` y hooks

---

## 🧩 1. Enfoque de desarrollo

Desde el inicio, me enfoqué en diseñar una arquitectura escalable, separando lógica, presentación, dominio y almacenamiento. Implementé primero el flujo de autenticación, luego la lógica del test, y finalmente el middleware y la exportación en PDF.

---

## 🧱 2. Desafíos encontrados

- **Protección de rutas y APIs** en App Router (Next 15): solucionado usando `middleware.ts` con validación dual (`cookies` + `Authorization`).
- **Persistencia sin DB**: implementado con `fs` sobre archivos `.json`.
- **Lógica de evaluación**: control del tiempo, validación de respuestas y generación de puntuación dinámica.

---

## 🧠 3. Decisiones arquitectónicas

- **App Router** de Next.js 15
- **Capas limpias**:
  - `components/`: UI separada
  - `hooks/`: lógica reusable
  - `services/`: cliente HTTP central
  - `layers/domain/`: entidades y modelos
- Middleware para proteger tanto rutas (`/academic/*`) como endpoints (`/api/assessment/*`).

---

## ✅ 4. Estrategia de pruebas

- **Pruebas manuales** en flujos clave.
- Logs de errores y estados.
- Validaciones desde el frontend y el backend (API).
- Simulación de flujos desde el login hasta la descarga del PDF.

---

## 💡 5. Mejoras futuras

- Base de datos real (PostgreSQL / MongoDB).
- Panel de administrador para ver resultados.
- Emails de confirmación al terminar evaluación.
- Ver resultado del test realizado.
- Usar AI para mejorar las recomendaciones de cursos.

---

## ⚛️ 6. Experiencia con React / Next.js

Tengo más de 3 años de experiencia con React, y 2+ usando Next.js. He trabajado con SSR, SSG, middleware, funciones API, layouts, metadatos dinámicos y optimización de rendimiento.

---

## 🖥️ 7. Experiencia backend

Amplia experiencia con Node.js y Express. En este proyecto aproveché los **API routes de Next.js**, aplicando lógica similar a un backend tradicional, con JWT, cookies, validaciones y persistencia simulada en `fs`.

---

## 🧪 8. Gestión de estado

Gestión mediante hooks:
- `useState` para formularios, respuestas, temporizador
- `useEffect` para inicialización y navegación protegida
- Hook `useAcademicUser` centraliza estado de sesión y logout

No fue necesario Redux ni Zustand dado el tamaño del proyecto.

---

## 🤖 9. Uso de herramientas de IA

Sí, utilicé [v0.dev](https://v0.dev) de Vercel para diseñar inicialmente la interfaz de usuario de la aplicación. Esta herramienta me permitió prototipar de forma rápida las vistas principales y enfocarme en la experiencia de usuario, lo que aceleró significativamente la fase de diseño. Posteriormente, ajusté manualmente los componentes generados para alinearlos con la lógica de la app y la estructura del proyecto.

---

## 📘 10. Aprendizajes

- Profundicé en **middleware dinámico** en Next.js 15 para proteger rutas del lado cliente y servidor.
- Consolidé conocimientos en **generación de PDF en el cliente**.
- Reforcé principios de **arquitectura limpia y DDD (Domain-Driven Design)** aplicados al backend, incluso sin una base de datos real, simulando una capa de persistencia con archivos JSON.
- Practiqué la estructuración de capas como entidades, modelos, servicios y repositorios en un entorno controlado.
- Implementé **JWT seguro** en frontend + backend de forma manual y controlada.

---

## 🔐 Middleware y Rutas Protegidas

```ts
// middleware.ts
export const config = {
  matcher: ["/api/assessment/:path*", "/academic/:path*"]
}
```

## 📎 Scripts útiles

```bash
npm run dev       # iniciar servidor de desarrollo
npm run build     # compilar para producción
npm start         # iniciar producción (después de build)
```

