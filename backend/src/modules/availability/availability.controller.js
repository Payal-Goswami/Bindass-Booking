import { getBookingsForDay } from './availability.repository.js';
import { computeAvailability } from './availability.service.js';
import { generateSlots } from './slot.js';

export async function getAvailability(req, res, next) {
  try {
    const { resourceId } = req.params;
    const { date } = req.query;

    if (!resourceId || !date) {
      return res.status(400).json({ error: 'resourceId and date are required' });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ error: 'date must be in YYYY-MM-DD format' });
    }

    const dayStart = new Date(`${date}T03:30:00Z`);
    const dayEnd = new Date(`${date}T12:30:00Z`);

    const bookings = await getBookingsForDay(
      resourceId,
      dayStart.toISOString(),
      dayEnd.toISOString()
    );

    const availability = computeAvailability(bookings, dayStart, dayEnd);

    const slots = availability.flatMap(range => generateSlots(range.start, range.end, 30));

    res.json(slots);
  } catch (err) {
    next(err);
  }
}
