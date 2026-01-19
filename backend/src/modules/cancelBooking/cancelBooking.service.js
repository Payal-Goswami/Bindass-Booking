import { supabase } from '../../config/supabase.js';
export async function cancelBooking({ bookingId, userId }) {
  const { error } = await supabase.rpc('cancel_booking', {
    p_booking_id: bookingId,
    p_user_id: userId
  });

  if (error) throw error;
}
