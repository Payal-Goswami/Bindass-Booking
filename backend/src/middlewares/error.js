export function errorHandler(err, req, res, next) {
  if (err.message === 'BOOKING_CONFLICT') {
    return res.status(409).json({ error: 'Time slot already booked' });
  }

  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({ error: message });
}
