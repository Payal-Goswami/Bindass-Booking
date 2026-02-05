export function generateDaySlotsUTC(date) {
  const slots = [];

  // 09:00 IST = 03:30 UTC
  let current = new Date(`${date}T03:30:00.000Z`);
  const end = new Date(`${date}T12:30:00.000Z`); // 18:00 IST

  while (current < end) {
    const next = new Date(current.getTime() + 30 * 60000);

    slots.push({
      start: new Date(current),
      end: new Date(next),
    });

    current = next;
  }

  return slots;
}

export function isSlotFree(slot, freeSlots) {
  return freeSlots.some(
    free =>
      new Date(free.start).getTime() === slot.start.getTime() &&
      new Date(free.end).getTime() === slot.end.getTime()
  );
}
