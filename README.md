# Bindass Booking

A conflict-free resource reservation platform built with React, Node.js, Express, and PostgreSQL (Supabase).

## Tech Stack

- **Frontend**: React + Vite, deployed on Vercel
- **Backend**: Node.js + Express.js, deployed on Render
- **Database**: PostgreSQL via Supabase (with PL/pgSQL stored procedures + row-level locking)
- **Auth**: Supabase Auth (JWT-based)

## Features

- Role-based access (ADMIN / USER)
- Resource listing with search and category filtering
- Calendar-based date selection
- 30-minute time slot booking (9 AM – 6 PM IST)
- Continuous and discontinuous slot booking
- Booking cancellation
- UTC storage, IST display
- Conflict-free reservations via `SELECT ... FOR UPDATE` in PostgreSQL
- Soft-delete for resources
- Admin resource management panel

## Local Setup

### 1. Clone and install

```bash
# Backend
cd backend
npm install
cp .env.example .env
# Fill in your Supabase credentials in .env

# Frontend
cd frontend
npm install
cp .env.example .env
# Fill in your Supabase credentials in .env
```

### 2. Run locally

```bash
# Backend (from /backend)
npm start

# Frontend (from /frontend)
npm run dev
```

### Environment variables

See `backend/.env.example` and `frontend/.env.example`.
