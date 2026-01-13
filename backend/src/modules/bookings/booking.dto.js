export function validateCreateBooking(body) {
  const { resourceId, startTime, endTime } = body;

  if (!resourceId || !startTime || !endTime) {
    throw new Error('Missing required fields');
  }

  if (new Date(startTime) >= new Date(endTime)) {
    throw new Error('Invalid time range');
  }

  return {
    resourceId,
    startTime,
    endTime
  };
}
