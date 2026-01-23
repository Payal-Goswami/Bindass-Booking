import { getBookingsForDay } from './availability.repository.js';
import { computeAvailability } from './availability.service.js';
import { generateSlots } from './slot.js';

export async function getAvailability(req, res, next) {
  try { //use the date format YYYY-MM-DD in req object

   const { resourceId } = req.params;
   const { date } = req. query;

   console.log("DATE : ", date);
   console.log("resourceId : ", resourceId);
   

    if (!resourceId || !date) {
      return res.status(400).json({
        error: 'resource Id and date are required'
      });
    }

    const dayStart = new Date(`${date}T09:00:00`);
    const dayEnd   = new Date(`${date}T18:00:00`);


    const bookings = await getBookingsForDay(
      resourceId,
      dayStart.toISOString(),
      dayEnd.toISOString()
    );


       console.log(
  'FETCHING BOOKINGS FOR:',
  resourceId,
  dayStart.toISOString(),
  dayEnd.toISOString()
);
console.log('BOOKINGS:', bookings);

    const availability = computeAvailability(
      bookings,
      dayStart,
      dayEnd
    );

    const slots = availability.flatMap(range =>
      generateSlots(range.start, range.end, 30)
    );

    res.json(slots);
  } catch (err) {
    next(err);
  }
}
