import { supabase } from '../../config/supabase.js';
export async function getUserBookings(userId) {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id,
      start_time,
      end_time,
      status,
      resources ( name )
    `)
    .eq('user_id', userId)
    .order('start_time', { ascending: false });

  if (error) throw error;
  return data;
}
