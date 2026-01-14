import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.js';
import bookingRoutes from './modules/bookings/booking.routes.js';
import availabilityRoutes from './modules/availability/availability.routes.js';
import resourceRoutes from './modules/resources/resource.routes.js';
const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/bookings', bookingRoutes);
app.use('/availability', availabilityRoutes);
app.use(errorHandler);
app.use('/resources', resourceRoutes);

export default app;
