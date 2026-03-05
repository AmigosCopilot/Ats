# SaaS Applicant Tracking System Prototype

Prototipo de ATS (Applicant Tracking System) con frontend React + Vite y backend opcional en Laravel.  
Diseño original: [Figma](https://www.figma.com/design/tWSqEXryzfqBwWkoakMeuB/SaaS-Applicant-Tracking-System-Prototype).

## Solo frontend (datos mock)

```bash
npm i
npm run dev
```

La app usa datos en memoria. No hace falta backend.

## Con backend Laravel (API real)

El backend usa **MySQL** por defecto.

### 1. Crear la base de datos en MySQL

Crea una base de datos llamada `ats` (o el nombre que pongas en `DB_DATABASE` en `.env`). En la terminal:

```bash
mysql -u root -p
```

Dentro de MySQL:

```sql
CREATE DATABASE ats CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

Si usas MAMP/XAMPP o otro usuario/contraseña, ajusta en `backend/.env`: `DB_USERNAME`, `DB_PASSWORD`, y si hace falta `DB_HOST` (por ejemplo `127.0.0.1` o `localhost`).

### 2. Migraciones y datos de prueba

En la raíz del proyecto:

```bash
cd backend
php artisan migrate
php artisan db:seed
```

Con eso se crean las tablas y se cargan candidatos y ofertas de ejemplo. También se crea un usuario para entrar:

- **Email:** `admin@ats.com`
- **Contraseña:** `admin123`

### 3. Login (sesión con token)

Con el backend activo, la app exige iniciar sesión. Las rutas de la API (candidatos, ofertas, dashboard) están protegidas con **Laravel Sanctum**: el frontend envía el token en `Authorization: Bearer ...`. Al cerrar sesión se revoca el token. Si ya ejecutaste `db:seed` antes de tener este usuario, créalo así:

```bash
cd backend
php artisan tinker
```

En tinker: `User::updateOrCreate(['email'=>'admin@ats.com'],['name'=>'Admin ATS','password'=>Hash::make('admin123')]);`

### 4. Arrancar backend y frontend

**Terminal 1 – API Laravel:**

```bash
cd backend
php artisan serve
```

**Terminal 2 – Frontend:** en la raíz del proyecto, crea o edita `.env` y pon:

```
VITE_API_URL=http://localhost:8000
```

Luego:

```bash
npm i
npm run dev
```

Con `VITE_API_URL` definido, el frontend consume la API de Laravel (candidatos, posiciones, dashboard, login). Sin esa variable, sigue usando datos mock y el login demo (admin@ats.com / admin123).

## Estructura

- **Raíz**: app React (Vite + TypeScript + Tailwind).
- **backend/**: API Laravel (PHP). Rutas bajo `/api`: login, registro, usuario, candidatos, posiciones, dashboard (protegidas con Sanctum).
