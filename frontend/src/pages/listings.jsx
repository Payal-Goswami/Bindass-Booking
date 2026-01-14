import { supabase } from '../auth/supabase';

export default function Listings() {
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Listings</h1>
      <p>(Frontend auth working 🎉)</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
