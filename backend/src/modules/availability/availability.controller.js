import { getBookingsForDay } from './availability.repository.js';
import { computeAvailability } from './availability.service.js';

export async function getAvailability(req, res, next) {
  try { //use the date format YYYY-MM-DD in req object
    const { resourceId, date } = req.query;

    const dayStart = new Date(`${date}T09:00:00Z`);
    const dayEnd = new Date(`${date}T18:00:00Z`);

    const bookings = await getBookingsForDay(
      resourceId,
      dayStart.toISOString(),
      dayEnd.toISOString()
    );

    const availability = computeAvailability(
      bookings,
      dayStart,
      dayEnd
    );

    res.json(availability);
  } catch (err) {
    next(err);
  }
}
