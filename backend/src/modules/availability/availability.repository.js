import { supabase } from '../../config/supabase.js';

export async function getBookingsForDay(resourceId, start, end) {
  const { data, error } = await supabase
    .from('bookings')
    .select('start_time, end_time')
    .eq('resource_id', resourceId)
    .in('status', ['PENDING', 'CONFIRMED'])
    .gte('start_time', start)
    .lte('end_time', end)
    .order('start_time');

  if (error) throw error;
  return data;
}
