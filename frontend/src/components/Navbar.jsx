import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../auth/supabase";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dbRole, setDbRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!user) {
      setDbRole(null);
      return;
    }

    supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data) setDbRole(data.role);
      });
  }, [user]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setMenuOpen(false);
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-primary">Bindass</span>{" "}
          <span className="brand-secondary">Booking</span>
        </Link>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        {user && (
          <Link to="/my-bookings" className="navbar-link" onClick={() => setMenuOpen(false)}>
            My Bookings
          </Link>
        )}

        {dbRole === "ADMIN" && (
          <Link to="/add-resource" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Admin
          </Link>
        )}

        {user ? (
          <div className="navbar-user-mobile">
            <span className="navbar-email">{user.email.split("@")[0]}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="navbar-link">
            Login / Register
          </Link>
        )}
      </div>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
