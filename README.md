# 🔥 Bindass Booking 
### Conflict-Free Resource Reservation Platform

Bindass Booking is a full-stack resource reservation system built with the PERN stack (PostgreSQL, Express, React, Node) and Supabase. It guarantees no double booking under concurrent requests using database-level transaction control.

The platform provides a seamless, timezone-agnostic slot selection interface that automatically handles UTC server time and IST user display.

It allows users to browse resources, check availability, and book time slots securely while preventing race conditions at the database layer.

## 🚀 Live Demo
- **Frontend:**  [Live Demo](https://bindass-booking.vercel.app)
- **Backend API:**  [Backend API](https://bindass-booking.onrender.com)

## 🛠️ Tech Stack
- **Frontend:** React.js (Vite), React Router, CSS
- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL), PL/pgSQL Stored Procedures
- **Authentication:** Supabase Auth
- **Deployment:** Vercel (Frontend) & Render (Backend)

## Key Problem Solved
Many booking systems rely only on frontend validation. Under concurrent requests, this can result in race conditions and double bookings.
Bindass Booking solves this by implementing database-level locking and transaction-safe operations.

### Guarantees:
- No overlapping bookings
- No race conditions
- Atomic slot reservation
- Strong consistency under concurrent access

## 🔐 Concurrency Handling
To prevent double booking:
- Resource row is locked using SELECT ... FOR UPDATE
- Existing overlapping bookings are checked.
- The booking is inserted only if the slot is confirmed free.
- Transaction ensures atomicity.

If two users attempt booking simultaneously:
- One succeeds
- The other receives a conflict error
  
This ensures correctness at the database layer, not just the UI.

## ✨ Features
**👤 Authentication & Roles**
- Supabase-based authentication
- Role-based system (ADMIN / USER)
- Synced auth.users with application users table

**📅 Booking Engine**
- Time-range booking model
- Server-side availability calculation
- UTC-safe storage with IST display
- Conflict-free reservations
- ACID-compliant transaction guarantees
- Automatically disables past time-slots and prevents overlapping bookings.

**👥 User Features**
- Browse resources
- Filter by category (Corporate / Campus / Leisure)
- view real-time availability by date
- Book continuous/discontinuous time slots
- View own bookings
- Cancel bookings

**🛠 Admin Features**
- Add resources
- Soft-delete resources
- Role-protected routes

**🔒 Security**
- Backend-enforced authorization
- CORS protected communication between Vercel & Render

---

## 🗄️ Database Architecture

Bindass Booking uses a relational PostgreSQL schema managed via Supabase.  
Data integrity is enforced through:

- Foreign Key constraints  
- Indexed query paths  
- Row-level locking for concurrency control  
- Transaction-safe stored procedures  

---

### 1️⃣ `users`

| Column      | Type        | Description |
|------------|------------|------------|
| `id`       | UUID (PK)  | Matches Supabase Auth user ID |
| `email`    | Text       | User email |
| `role`     | Enum       | `ADMIN` / `USER` |
| `created_at` | Timestamptz | Timestamp of account creation |

> Supabase handles authentication via `auth.users`.  
---

### 2️⃣ `resources`

Stores bookable assets such as rooms, labs, cabins, etc.

| Column      | Type        | Description |
|------------|------------|------------|
| `id`       | UUID (PK)  | Unique resource identifier |
| `name`     | Text       | Display name |
| `type`     | Text       | `CORPORATE` / `CAMPUS` / `LEISURE` |
| `capacity` | Integer    | Maximum occupancy |
| `owner_id` | UUID (FK)  | References `users.id` |
| `created_at` | Timestamptz | Creation timestamp |
| `is_active` | Boolean   | Soft-delete flag |
| `description` | Text   | description |
| `image` | Text   | Resource image link |

Soft deletion ensures historical bookings remain valid.

---

### 3️⃣ `bookings`

Core reservation engine table.

| Column       | Type         | Description |
|-------------|-------------|-------------|
| `id`        | UUID (PK)   | Unique booking identifier |
| `resource_id` | UUID (FK) | References `resources.id` |
| `user_id`   | UUID (FK)   | References `users.id` |
| `start_time` | Timestamptz | Slot start time (Stored in UTC) |
| `end_time`   | Timestamptz | Slot end time (Stored in UTC) |
| `status`     | Enum        | `PENDING` / `CONFIRMED` / `CANCELLED` |
| `created_at` | Timestamptz | Booking creation timestamp |


---

## ⚙️ Environment Variables

To run this project locally, create a `.env` file in the `frontend` and `backend` folders:

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
**Backend (.env):**
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key
PORT=8080
```
## Installation & Setup

git clone https://github.com/Payal-Goswami/Bindass-Booking.git

cd Bindass-Booking

### Setup Backend:

cd backend

npm install

npm start

### Setup Frontend:

cd frontend

npm install

npm run dev

## 🚀 Future Improvements
- Pricing & payment integration
- WebSocket-based real-time slot updates
- Real-time email/SMS confirmations.
- Multi-owner resource management
- Booking analytics dashboard
  
---

**Created with 💖 by Payal Goswami**
