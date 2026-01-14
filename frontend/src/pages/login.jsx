import { useState } from 'react';
import { supabase } from '../auth/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) setError(error.message);
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) setError(error.message);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login / Signup</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value.trim())}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value.trim())}
      />

      <br />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
