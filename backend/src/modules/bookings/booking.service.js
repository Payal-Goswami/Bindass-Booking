import { supabase } from '../../config/supabase.js';

export async function createBooking({
  resourceId,
  userId,
  startTime,
  endTime
}) {
  const { data, error } = await supabase.rpc('create_booking', {
    p_resource_id: resourceId,
    p_user_id: userId,
    p_start_time: startTime,
    p_end_time: endTime
  });

  if (error) {
    if (error.message.includes('Time slot already booked')) {
      throw new Error('BOOKING_CONFLICT');
    }
    throw error;
  }

  return data;
}
