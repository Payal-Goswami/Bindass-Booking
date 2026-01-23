import express from 'express';
import cors from 'cors';
import bookingRoutes from './modules/bookings/booking.routes.js';
import availabilityRoutes from './modules/availability/availability.routes.js';
import resourceRoutes from './modules/resources/resource.routes.js';
import cancelRoutes from './modules/cancelBooking/cancelBooking.routes.js';
import addResourceRoutes from './modules/addResource/addResource.routes.js';
import { errorHandler } from './middlewares/error.js';
const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173'
// }));
app.use(cors());

app.use(express.json());

app.use('/bookings', bookingRoutes);
// app.use('/availability', availabilityRoutes);
app.use('/resources', resourceRoutes);
app.use('/cancel', cancelRoutes);
app.use('/admin/resources', addResourceRoutes);
app.use(errorHandler);
export default app;
