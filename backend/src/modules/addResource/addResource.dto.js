export function validateCreateResource(body) {
  const { name, type, capacity } = body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    const err = new Error('Resource name is required');
    err.status = 400;
    throw err;
  }

  if (!type) {
    const err = new Error('Resource type is required');
    err.status = 400;
    throw err;
  }

  const validTypes = ['ALL', 'CORPORATE', 'CAMPUS', 'LEISURE'];
  if (!validTypes.includes(type)) {
    const err = new Error(`Type must be one of: ${validTypes.join(', ')}`);
    err.status = 400;
    throw err;
  }

  if (capacity !== undefined && (isNaN(capacity) || Number(capacity) <= 0)) {
    const err = new Error('Capacity must be a positive number');
    err.status = 400;
    throw err;
  }

  return {
    name: name.trim(),
    type,
    capacity: capacity ? Number(capacity) : 1
  };
}
