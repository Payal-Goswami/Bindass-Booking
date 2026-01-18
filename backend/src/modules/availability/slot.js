export function generateSlots(start, end, slotMinutes = 30) {
  const slots = [];
  let current = new Date(start);

  while (current < end) {
    const next = new Date(
      current.getTime() + slotMinutes * 60 * 1000
    );

    if (next <= end) {
      slots.push({
        start: new Date(current),
        end: new Date(next),
      });
    }

    current = next;
  }

  return slots;
}
