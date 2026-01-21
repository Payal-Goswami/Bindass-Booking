import { supabase } from '../../config/supabase.js';

export async function createResource({
  name,
  type,
  capacity,
  ownerId
}) {
  const { data, error } = await supabase.rpc('create_resource', {
    p_name: name,
    p_type: type,
    p_capacity: capacity,
  });

  if (error) throw error;
  return data;
}

export async function deleteResource({ resourceId, userId }) {
  const { error } = await supabase.rpc('delete_resource', {
    p_resource_id: resourceId,
    p_user_id: userId
  });

  if (error) throw error;
}
