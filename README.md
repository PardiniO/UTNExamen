# 🗃️ Backend con Node.js, Express y Docker
Backend para gestión de usuarios, productos y pedidos con Node.js, Express, MySQL y Docker. Incluye autenticación JWT y validación de roles

---

## Requisitos

- Docker
- Node.js
- CLiente HTTP como Postman

---

## Instalación y ejecución

1. Clonar repositorio:
```bash
git clone https://github.com/PardiniO/UTNExamen.git
cd <NOMBRE_DEL_REPOSITORIO>
```
2. Instalar dependencias:
```bash
npm install
```
3. Construir y levantar los contenedores con Docker:
```bash
docker-compose up -d --build
```
4. Compilar proyecto:
```bash
npm run buil
```
5. Ejecutar proyecto:
```bash
npm start
```
6. Apagar contendores:
```bash
docker-compose down
```

---

## Estructura del proyecto
```
/src
 ├─ config → configuración de conexión a la base de datos
 ├─ controllers → lógica de negocio
 ├─ interfaces → definición de tipos
 ├─ middlewares  → guards, autenticación y validación de roles
 ├─ models → definición de clases y métodos
 ├─ queries → script con las principales queries sql 
 ├─ routes → definición de endpoints REST
 └─ services → conexión entre controllers y models
```
---

## 🔑 Autenticación y endpoints principales:

Usuarios:
- JWT en header: Authorization: Bearer <token>

- POST /usuarios/register → registro de usuario

- POST /usuarios/login → login, devuelve JWT

- GET /usuarios-pedidos → lista de todos los usuarios con pedidos (solo para admin y superAdmin)

- PUT /usuarios/:id  → actualizar usuario (solo para admin y superAdmin)

- DELETE /usuarios/:id  → eliminar usuario (solo superAdmin)

Productos:

- POST /productos → crear productos (solo para admin y superAdmin)

- GET /productos → listar productos

- PUT /productos/:id → actualizar producto

- DELETE /productos/:id → eliminar producto

Pedidos:

- POST /pedidos → crear pedido

- GET /pedidos → listar pedido

- PUT /pedidos/:id → modificar pedido

- DELETE /pedidos/:id → eliminar pedido

---

## 🔑 Roles y permisos

- superAdmin → puede crear/eliminar usuarios, gestionar productos y pedidos.

- admin → puede gestionar productos y ver pedidos.

- user → puede crear pedidos y ver sus propios pedidos

