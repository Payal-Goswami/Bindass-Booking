import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.js';
import bookingRoutes from './modules/bookings/booking.routes.js';
import availabilityRoutes from './modules/availability/availability.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/bookings', bookingRoutes);
app.use('/availability', availabilityRoutes);
app.use(errorHandler);

export default app;
