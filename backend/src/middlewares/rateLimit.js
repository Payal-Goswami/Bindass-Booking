const requests = new Map();

export function rateLimit({ windowMs = 60000, max = 20 } = {}) {
  return (req, res, next) => {
    const key = req.user?.id || req.ip;
    const now = Date.now();

    if (!requests.has(key)) {
      requests.set(key, []);
    }

    const timestamps = requests.get(key).filter(t => now - t < windowMs);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > max) {
      return res.status(429).json({ error: 'Too many requests. Please slow down.' });
    }

    next();
  };
}
