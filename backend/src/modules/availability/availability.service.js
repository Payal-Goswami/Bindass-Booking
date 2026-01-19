// export function computeAvailability(bookings, dayStart, dayEnd) {
//   let availability = [
//   { start: new Date(dayStart), end: new Date(dayEnd) }
// ];

//   for (const booking of bookings) {
//     const bookingStart = new Date(booking.start_time);
//     const bookingEnd = new Date(booking.end_time);

//     availability = availability.flatMap(slot => {
//       if (
//         bookingEnd <= slot.start ||
//         bookingStart >= slot.end
//       ) {
//         return [slot];
//       }

//       const slots = [];

//       if (bookingStart > slot.start) {
//         slots.push({
//           start: slot.start,
//           end: bookingStart
//         });
//       }

//       if (bookingEnd < slot.end) {
//         slots.push({
//           start: bookingEnd,
//           end: slot.end
//         });
//       }

//       return slots;
//     });
//   }

//   return availability;
// }







export function computeAvailability(
  bookings,
  dayStart,
  dayEnd,
  slotMinutes = 30
) {
  const slots = [];
  let cursor = new Date(dayStart);
  for (const booking of bookings) {
    const bookingStart = new Date(booking.start_time);
    if (cursor < bookingStart) {
      slots.push({
        start: new Date(cursor),
        end: new Date(bookingStart)
      });
    }
    cursor = new Date(
      Math.max(cursor.getTime(), new Date(booking.end_time).getTime())

    );
  }
  if (cursor < dayEnd) {
    slots.push({ start: cursor, end: dayEnd });

  }
  return slots.filter(
    s => (s.end - s.start) / (1000 * 60) >= slotMinutes //diff is in ms

  );

}

