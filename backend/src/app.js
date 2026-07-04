import express from 'express';
import cors from 'cors';
import bookingRoutes from './modules/bookings/booking.routes.js';
import resourceRoutes from './modules/resources/resource.routes.js';
import userBookingRoutes from './modules/userBooking/userBooking.routes.js';
import addResourceRoutes from './modules/addResource/addResource.routes.js';
import { errorHandler } from './middlewares/error.js';

const app = express();

const allowedOrigins = [
  'https://bindass-booking.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/userBookings', userBookingRoutes);
app.use('/resources', resourceRoutes);
app.use('/bookings', bookingRoutes);
app.use('/admin/resources', addResourceRoutes);

app.use(errorHandler);

export default app;
