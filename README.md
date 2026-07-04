# ✨ Bindass Booking 🎉
### Conflict-Free Resource Reservation Platform

Bindass Booking is a full-stack resource reservation system built with the PERN stack (PostgreSQL, Express, React, Node) and Supabase. It guarantees no double booking under concurrent requests using database-level transaction control.
It allows users to browse resources, check availability, and book time slots securely while preventing race conditions at the database layer.

## 🚀 Live Demo
- **Frontend:**  [Live Demo](https://bindass-booking.vercel.app)
- **Backend API:**  [Backend API](https://bindass-booking.onrender.com)

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL via Supabase (with PL/pgSQL stored procedures + row-level locking)
- **Auth**: Supabase Auth (JWT-based)
- **Deployment:** Vercel (Frontend) & Render (Backend)

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

### Guarantees:
- No overlapping bookings
- No race conditions
- Atomic slot reservation
- Strong consistency under concurrent access
  
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

## 🚀 Future Improvements
- Pricing & payment integration
- WebSocket-based real-time slot updates
- Real-time email/SMS confirmations.
- Multi-owner resource management
- Booking analytics dashboard

**Created with 💖 by Payal Goswami**
