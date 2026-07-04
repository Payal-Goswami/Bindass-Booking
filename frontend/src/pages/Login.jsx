import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { login } from "../auth/auth.api";
import "../styles/Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;
  const redirectTo = location.state?.redirectTo || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate(redirectTo);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back 👋</h2>
        {message && <div className="auth-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            disabled={loading}
          />
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="auth-error">{error}</p>}
        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link">Signup</Link>
        </p>
      </div>
    </div>
  );
}
