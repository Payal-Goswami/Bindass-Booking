import { supabase } from '../../config/supabase.js';

export async function createResource({
  name,
  type,
  capacity,
  ownerId,
  description,
  image
}) {

  console.log("NAME : ", name);
  console.log("TYPE : ", type);
  console.log("CAPACITY : ", capacity);
  console.log("OWNERID : ", ownerId);
  console.log("DESC : ", description);
  console.log("IMAGE : ", image);
  
  const { data, error } = await supabase.rpc('create_resource', {
    p_name: name,
    p_type: type,
    p_capacity: capacity,
    p_owner_id: ownerId,
    p_description: description,
    p_image: image
  });

  if (error) throw error;
  return data;
}

export async function deleteResource({ resourceId }) {
  const { error } = await supabase
    .from('resources')
    .update({ is_active: false })
    .eq('id', resourceId);

  if (error) throw error;
}

export async function getAllResources() {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function activateResource({ resourceId }) {
  const { error } = await supabase
    .from('resources')
    .update({ is_active: true })
    .eq('id', resourceId);

  if (error) throw error;
}
