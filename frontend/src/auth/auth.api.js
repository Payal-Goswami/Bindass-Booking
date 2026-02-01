import { supabase } from './supabase';

export async function login(email, password) {

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

export async function signup(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) throw error;

  await supabase.from('users').insert({
    id: data.user.id,
    email: data.user.email,
    role: 'USER'
  });

  return data;
}

export async function logout() {
  await supabase.auth.signOut();
}
