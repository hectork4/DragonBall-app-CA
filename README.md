# Dragon Ball App

## Descripción General

Este proyecto es una aplicación que muestra una lista de personajes de Dragon Ball utilizando React y TypeScript. La aplicación permite al usuario interactuar con una API externa para mostrar los personajes y gestionar una lista de favoritos. Además, incluye funcionalidades como búsqueda de personajes, persistencia de datos y pruebas automatizadas.

## Arquitectura

La arquitectura utilizada en el proyecto es una arquitectura hexagonal (Hexagonal Architecture), también conocida como arquitectura de puertos y adaptadores (Ports and Adapters Architecture). Esta arquitectura organiza las distintas partes de la aplicación en capas, separando la lógica de negocio de la infraestructura y la interfaz de usuario. Esto ayuda a mantener el código limpio, organizado y escalable.

### Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
src/
├── application/ # Casos de uso y lógica de aplicación
├── assets/ # Archivos estáticos (imágenes, fuentes, etc.)
├── domain/ # Entidades, repositorios y excepciones del dominio
├── hooks/ # Hooks personalizados
├── infrastructure/ # Implementaciones de repositorios, API y almacenamiento
├── presentation/ # Componentes y páginas de la interfaz de usuario
└── utils/ # Funciones utilitarias y helpers
```

## Funcionalidades

- **Persistencia de Datos**: Los favoritos seleccionados por el usuario se almacenan en `localStorage`. Además, los datos obtenidos de las peticiones a la API se almacenan durante 24 horas para evitar múltiples llamadas repetidas a la API.
- **Consumo de API**: La aplicación consume la API de Dragon Ball a través de [Dragon Ball API](https://web.dragonball-api.com/).
- **Búsqueda**: La barra de búsqueda ejecuta la búsqueda de personajes cuando el usuario deja de escribir por 2 segundos o presiona Enter.
- **Pruebas**: Las pruebas automatizadas se configuran utilizando [Vitest](https://vitest.dev/). El objetivo es superar el 80% de cobertura de pruebas en el proyecto.

**Nota**: No es necesario registrarse en la API de Dragon Ball para obtener una clave API.

## Instalación

Para comenzar con el proyecto, sigue estos pasos:

1. **Clonar el repositorio**:

   Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/hectork4/DragonBall-app-CA.git
   ```

2. **Instalar las dependencias**:

Instala las dependencias del proyecto usando npm:

```bash
npm install
```

## Scripts Disponibles

El proyecto incluye varios scripts útiles que puedes ejecutar con `npm run <script>`:

### `dev`

```bash
 npm run dev
```

Inicia el servidor de desarrollo.

El servidor estará disponible en http://localhost:5173 por defecto.

### `build`

```bash
 npm run build
```

Compila la aplicación para producción.

Los archivos de producción se generarán en la carpeta dist.

### `lint`

```bash
 npm run lint
```

Ejecuta ESLint para analizar el código y detectar posibles problemas de estilo o errores.

### `preview`

```bash
 npm run preview
```

Muestra una previsualización de la aplicación de producción.

El servidor de previsualización estará disponible en http://localhost:4173.

### `test`

```bash
 npm run test
```

Ejecuta las pruebas de la aplicación utilizando Vitest.

### `test:watch`

```bash
 npm run test:watch
```

Ejecuta las pruebas en modo vigilancia, lo que significa que se vuelven a ejecutar automáticamente cada vez que cambias un archivo.

### `test:coverage`

```bash
 npm run test:coverage
```

Ejecuta las pruebas y genera un informe de cobertura.
