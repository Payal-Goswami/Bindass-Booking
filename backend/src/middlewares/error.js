export function errorHandler(err, req, res, next) {
  if (err.message === 'BOOKING_CONFLICT') {
    return res.status(409).json({
      error: 'Time slot already booked!'
    });
  }

  res.status(500).json({
  error: err.message || 'Internal server error'
});
}
