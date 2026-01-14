import { supabase } from '../../config/supabase.js';

export async function getAllResources() {
  const { data, error } = await supabase
    .from('resources')
    .select('*');

  if (error) throw error;
  return data;
}
