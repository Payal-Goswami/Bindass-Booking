export function validateCreateBooking(body) {
  const { resourceId, startTime, endTime } = body;

  if (!resourceId || !startTime || !endTime) {
    const err = new Error('Missing required fields: resourceId, startTime, endTime');
    err.status = 400;
    throw err;
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    const err = new Error('Invalid date format');
    err.status = 400;
    throw err;
  }

  if (start >= end) {
    const err = new Error('startTime must be before endTime');
    err.status = 400;
    throw err;
  }

  if (start < new Date()) {
    const err = new Error('Cannot book a slot in the past');
    err.status = 400;
    throw err;
  }

  return { resourceId, startTime, endTime };
}
