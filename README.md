# Task Logging Application

A full-stack task logging application built with modern DevOps practices, featuring a containerized React frontend, Node.js/Express backend, PostgreSQL database, and automated CI/CD to an AWS VPS.

Live app: `https://tasklogging.codes`  
API : `https://tasklogging.codes/api`

---

## 1. Overview

This project implements a simple task logging system where users can:

- Create tasks with a message and timestamp
- View a list of existing tasks

The focus is on production ready architecture and DevOps:

- Containerized services (frontend, backend, database, nginx)
- Nginx reverse proxy and load balancing
- GitHub Actions CI/CD pipeline
- Deployment to Linux VPS with a custom domain and SSL

---

## 2. Tech Stack

### Frontend

- React + TypeScript
- Axios / fetch for API calls

### Backend

- Node.js, Express, TypeScript
- PostgreSQL client (`pg`)

### Database

- PostgreSQL (Dockerized)
- Initialized on startup, persistent via Docker volume

### Infrastructure

- Docker, Docker Compose
- Nginx reverse proxy
- AWS EC2 (Ubuntu)

### CI/CD

- GitHub Actions
- Docker Hub for container registry

---

## 3. Architecture

The system consists of four main Docker services:

### `frontend`

- React SPA served as static files behind Nginx
- Uses a dynamic API base URL:
  - Development: `REACT_APP_API_BASE_URL`
  - Production: relative `/api`

### `backend`

- Express REST API
- Endpoints:
  - `POST /api/task` – Create a task
  - `GET /api/task` – List tasks
  - `GET /health` – Simple health check for tests
- Uses environment variables for DB configuration:
  - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

### `database`

- PostgreSQL running in an internal Docker network
- Not exposed to the public internet
- Data persisted via Docker volume

### `nginx`

- Entry point for all HTTP/HTTPS traffic
- Routing:
  - `/` → frontend
  - `/api` → backend
- Load balances across multiple backend instances when scaled
- Handles SSL termination (Let’s Encrypt certificates)
- Forces HTTP → HTTPS redirection

---

## 4. Local Development

### Prerequisites

- Node.js 18+ (for local dev)
- Docker & Docker Compose
- Git

### Run locally with Docker Compose

From the project root:
docker compose up -d

This will start:

- `frontend` on port `80` (via nginx)
- `backend` on internal Docker network
- `postgres` on internal Docker network
- `nginx` on `localhost:80`

Access the app:

- App: `http://localhost:8080`
- API (proxied): `http://localhost:8080/api/task`

### Backend local dev (without Docker)

cd apps/backend
npm install
npm run dev

Environment variables can be configured via `.env` in `apps/backend`.

### Frontend local dev (without Docker)

cd apps/frontend
npm install
npm start

Configure API base URL via: REACT_APP_API_BASE_URL=https://tasklogging.codes/api

---

## 5. CI/CD Pipeline (GitHub Actions)

GitHub Actions is used for both Continuous Integration and Continuous Deployment.

### Continuous Integration (CI)

For each push to `main`:

**Backend**

- `npm install`
- `npm run lint`
- `npm test`

**Frontend**

- `npm install`
- `npm run lint`
- `npm test`

**Docker build**

- Build production images for frontend and backend

### Continuous Deployment (CD)

On successful CI:

1. Build and push images to Docker Hub:
   - `mindiya/task-frontend`
   - `mindiya/task-backend`
2. SSH into the AWS VPS using GitHub Secrets:
   - `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`
3. On VPS:
   - `docker compose pull`
   - `docker compose up -d`

All sensitive values (Docker Hub credentials, SSH key, DB credentials) are stored in GitHub Secrets.

---

## 6. Deployment: AWS VPS

**Platform:** AWS EC2 (Ubuntu)

On the VPS:

1. Install dependencies:
   - Docker
   - Docker Compose
   - Git
   - Certbot

2. Clone the repository:
   git clone https://github.com/mindiya12/task-logging-app.git
   cd task-logging-app

3. Run the stack:
   docker compose up -d

4. Scale backend horizontally:

docker compose up -d --scale backend=2

Nginx’s upstream configuration automatically load-balances between backend instances.

---

## 7. Domain & SSL

**Domain:** `taskLogging.codes`

### DNS configuration

- A record `@` → EC2 public IP
- A record `www` → EC2 public IP

### SSL (Let’s Encrypt + Certbot)

- Certbot (`certbot certonly --standalone`) used to obtain certificates for:
  - `taskLogging.codes`
  - `www.taskLogging.codes`
- Certificates stored under:
  - `/etc/letsencrypt/live/tasklogging.codes/`
- Mounted into nginx container and referenced in `nginx.conf`

### Nginx SSL configuration

- `listen 443 ssl;` with cert/key paths
- HTTP server on port 80 returns:

return 301 https://$host$request_uri;

for forced HTTPS redirection.

### Final URLs

- App: `https://tasklogging.codes`
- API: `https://tasklogging.codes/api`

---

## 8. Docker Images

Frontend image:

- `mindiya/task-frontend:latest`

Backend image:

- `mindiya/task-backend:latest`

---

## 9. Scaling & Operations

### Scale backend

docker compose up -d --scale backend=2

### View running containers

docker ps
