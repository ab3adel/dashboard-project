
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> # Dashboard Project Management System

A full-stack project management dashboard built with:

- NestJS (Backend API)
- PostgreSQL + TypeORM
- JWT Authentication (Access + Refresh tokens)
- React + TailwindCSS (Frontend)
- Role-based authorization (Admin / Member)
</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Features

- User authentication with JWT
- Role-based access control (Admin / Member)
- CRUD operations for Projects
- CRUD operations for Users
- Assign members to projects
- Protected routes
- Access token auto-refresh
- Responsive dashboard UI
- Confirmation dialogs for destructive actions

## Architecture

### Backend
- NestJS
- TypeORM
- PostgreSQL
- JWT-based authentication
- Refresh token stored in httpOnly cookie

### Frontend
- React (Vite)
- TailwindCSS
- Axios with interceptors
- Automatic token refresh


## Authentication Flow

1. User logs in.
2. Server returns:
   - Access Token (short-lived)
   - Refresh Token (httpOnly cookie)
3. Access token is attached to all API requests.
4. If access token expires:
   - Frontend automatically calls `/auth/refresh`
   - A new access token is issued.
5. If refresh token is expired:
   - User is redirected to login.


## Roles

- Admin:
  - Create / Update / Delete Projects
  - Assign users to projects
  - Manage users

- Member:
  - View assigned projects only


## Backend Setup

1. Install dependencies:
   npm install

2. Create `.env` file:

   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=yourpassword
   DATABASE_NAME=dashboard

   JWT_SECRET=your_secret
4. Seed Database : 
   npm run seed
3. Run server:
   npm run start:dev

## Frontend Setup

1. Navigate to frontend folder:
   cd frontend/dashboard-ui

2. Install dependencies:
   npm install

3. Run:
   npm run dev

## Environment Variables

| Variable | Description |
|----------|-------------|
| DATABASE_HOST | Database host |
| DATABASE_PORT | Database port |
| JWT_SECRET | JWT signing secret |
| ACCESS_TOKEN_TTL | Access token expiration |
| REFRESH_TOKEN_TTL | Refresh token expiration |
``

## API Endpoints

### Auth
POST /authentication/login
POST /authentication/refresh

### Projects
GET /projects
POST /projects
PATCH /projects/:id
DELETE /projects/:id

### Users
GET /user
POST /user


## Security

- Access tokens are short-lived.
- Refresh tokens are stored in httpOnly cookies.
- Role-based guards protect sensitive routes.
- Confirmation dialog for destructive actions.


## Folder Structure

backend/
  src/
    authentication/
    users/
    projects/

frontend/
  src/
    components/
    pages/
    api/
