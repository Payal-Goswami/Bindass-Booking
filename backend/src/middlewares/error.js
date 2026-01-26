export function errorHandler(err, req, res, next) {
  if (err.message === 'BOOKING_CONFLICT') {
    
    console.error("EXPRESS ERROR:", err.stack);

    return res.status(409).json({
      error: 'Time slot already booked!'
    });
  }

  console.error("EXPRESS ERROR:", err.stack);

  res.status(500).json({
  error: err.message || 'Internal server error'
});
}
