export function validateCreateResource(body) {
  const { name, type, capacity } = body;

  if (!name || !type) {
    throw new Error('Missing required fields');
  }

  if (capacity && capacity <= 0) {
    throw new Error('Invalid capacity');
  }

  return {
    name,
    type,
    capacity: capacity || 1
  };
}
