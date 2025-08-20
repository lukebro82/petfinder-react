# Pet Finder App

Pet Finder es una aplicación web desarrollada con React, TypeScript y Vite que permite reportar, buscar y editar mascotas perdidas cerca de tu ubicación. Utiliza Mapbox para geolocalización y un backend en Node.js/Express para la gestión de usuarios, mascotas y reportes.

## Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Reporte de mascotas perdidas con foto y ubicación.
- Edición y eliminación de reportes de mascotas propias.
- Búsqueda de mascotas perdidas cerca de tu ubicación.
- Envío de información sobre mascotas vistas a sus dueños.
- Gestión de datos personales y cambio de contraseña.

## Tecnologías utilizadas

- **Frontend:** React 19, TypeScript, Vite, Zustand, Mapbox GL, SweetAlert2.
- **Backend:** Node.js, Express, Algolia, Cloudinary.
- **Estilos:** CSS Modules.

## Scripts disponibles

- `npm run dev` – Inicia el servidor de desarrollo.
- `npm run build` – Compila la aplicación para producción.
- `npm run preview` – Previsualiza la aplicación de producción.

## Estructura del proyecto

```
src/
  atom/           # Estado global (Zustand)
  components/     # Componentes reutilizables
  hooks/          # Custom hooks
  pages/          # Vistas principales
  router/         # Rutas de la app
  ui/             # Componentes UI
  assets/         # Imágenes y recursos
public/
  vite.svg
```

## Cómo empezar

1. Instala las dependencias:
   ```sh
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```sh
   npm run dev
   ```
3. Accede a la app en [http://localhost:3000](http://localhost:3000).

---

Desarrollado para el curso APX
