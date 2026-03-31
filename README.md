# API Testing - JSONPlaceholder

![API Tests](https://github.com/Julieta-entivero/api-testing-jsonplaceholder/actions/workflows/tests.yml/badge.svg)

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-6.x-blue)
![Mocha](https://img.shields.io/badge/Mocha-10.x-8D6748?logo=mocha&logoColor=white)
![Chai](https://img.shields.io/badge/Chai-4.x-A30701)

Suite de automatizacion de pruebas de API para [JSONPlaceholder](https://jsonplaceholder.typicode.com/), una API REST publica y gratuita disenada para testing y prototipado. Este proyecto demuestra buenas practicas de QA Automation aplicadas a pruebas de servicios REST.

---

## Tecnologias

| Herramienta | Uso |
|---|---|
| **Node.js** | Entorno de ejecucion |
| **Supertest** | Cliente HTTP para pruebas de API |
| **Mocha** | Framework de testing |
| **Chai** | Libreria de aserciones |
| **Mochawesome** | Generador de reportes HTML |
| **GitHub Actions** | Integracion continua (CI) |

---

## Cobertura de Tests

### API de Posts (8 tests)

| Endpoint | Metodo | Caso de prueba |
|---|---|---|
| `/posts` | GET | Listar todos los posts |
| `/posts` | GET | Validar estructura de datos |
| `/posts?userId=1` | GET | Filtrar posts por userId |
| `/posts/1` | GET | Obtener post por ID |
| `/posts/9999` | GET | Post inexistente (404) |
| `/posts/1/comments` | GET | Obtener comentarios de un post |
| `/posts` | POST | Crear nuevo post |
| `/posts/1` | PUT | Actualizar post completo |
| `/posts/1` | PATCH | Actualizacion parcial |
| `/posts/1` | DELETE | Eliminar post |

### API de Usuarios (8 tests)

| Endpoint | Metodo | Caso de prueba |
|---|---|---|
| `/users` | GET | Listar todos los usuarios |
| `/users` | GET | Validar estructura de datos |
| `/users/1` | GET | Validar estructura de direccion |
| `/users/1` | GET | Obtener usuario por ID |
| `/users/9999` | GET | Usuario inexistente (404) |
| `/users` | POST | Crear nuevo usuario |
| `/users/1` | PUT | Actualizar usuario completo |
| `/users/1` | PATCH | Actualizacion parcial |
| `/users/1` | DELETE | Eliminar usuario |

### API de Comentarios (6 tests)

| Endpoint | Metodo | Caso de prueba |
|---|---|---|
| `/comments` | GET | Listar todos los comentarios |
| `/comments` | GET | Validar estructura de datos |
| `/comments?postId=1` | GET | Filtrar por postId |
| `/comments` | GET | Validar formato de email |
| `/comments/1` | GET | Obtener comentario por ID |
| `/comments/9999` | GET | Comentario inexistente (404) |

### API de Tareas (9 tests)

| Endpoint | Metodo | Caso de prueba |
|---|---|---|
| `/todos` | GET | Listar todas las tareas |
| `/todos` | GET | Validar estructura de datos |
| `/todos?completed=true` | GET | Filtrar tareas completadas |
| `/todos?completed=false` | GET | Filtrar tareas pendientes |
| `/todos?userId=1` | GET | Filtrar tareas por userId |
| `/todos/1` | GET | Obtener tarea por ID |
| `/todos/9999` | GET | Tarea inexistente (404) |
| `/todos` | POST | Crear nueva tarea |
| `/todos/1` | PATCH | Marcar tarea como completada |

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm (incluido con Node.js)

---

## Instalacion y ejecucion

```bash
# Clonar el repositorio
git clone https://github.com/Julieta-entivero/api-testing-jsonplaceholder.git
cd api-testing-jsonplaceholder

# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Ejecutar tests con reporte HTML
npm run test:report
```

El reporte HTML se genera en la carpeta `mochawesome-report/`.

---

## Estructura del proyecto

```
api-testing-jsonplaceholder/
├── .github/workflows/
│   └── tests.yml                # Pipeline de CI con GitHub Actions
├── tests/
│   ├── posts.test.js            # Tests de la API de Posts
│   ├── users.test.js            # Tests de la API de Usuarios
│   ├── comments.test.js         # Tests de la API de Comentarios
│   └── todos.test.js            # Tests de la API de Tareas
├── package.json
├── .gitignore
└── README.md
```

---

## Integracion Continua

Este proyecto utiliza **GitHub Actions** para ejecutar los tests automaticamente en cada push y pull request a la rama `main`. Los tests se ejecutan en Node.js 18 y 20. Los reportes HTML se almacenan como artefactos del workflow.

---

## Autora

**Julieta Entivero** - QA Automation Engineer

---
