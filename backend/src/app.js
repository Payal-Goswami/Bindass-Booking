import express from 'express';
import cors from 'cors';
import bookingRoutes from './modules/bookings/booking.routes.js';
import { errorHandler } from './middlewares/error.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/bookings', bookingRoutes);
app.use(errorHandler);

export default app;
