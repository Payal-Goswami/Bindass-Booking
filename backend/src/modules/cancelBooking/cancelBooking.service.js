import { supabase } from '../../config/supabase.js';
export async function cancelBooking({ bookingId, userId }) {
  console.log("bookingId : ", bookingId);
  const { error } = await supabase.rpc('cancel_booking', {
    p_booking_id: bookingId,
    p_user_id: userId
  });

  if (error) {
    console.log("ERROR in service.js : ", error);
    throw error;
  }
}
