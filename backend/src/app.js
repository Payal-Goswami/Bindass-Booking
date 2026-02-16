import express from 'express';
import cors from 'cors';
import bookingRoutes from './modules/bookings/booking.routes.js';
import resourceRoutes from './modules/resources/resource.routes.js';
import cancelRoutes from './modules/cancelBooking/cancelBooking.routes.js';
import userBookingRoutes from './modules/userBooking/userBooking.routes.js';
import addResourceRoutes from './modules/addResource/addResource.routes.js';
import { errorHandler } from './middlewares/error.js';
const app = express();
app.use(cors({
  origin: ['https://bindass-booking.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/userBookings', userBookingRoutes);
app.use('/resources', resourceRoutes);
app.use('/bookings', bookingRoutes);
app.use('/cancel', cancelRoutes);
app.use('/admin/resources', addResourceRoutes);
app.use(errorHandler);
export default app;
