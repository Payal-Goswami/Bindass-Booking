import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../auth/supabase";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-brand">
          <span className="brand-primary">Bindass</span>{" "}
          <span className="brand-secondary">Booking</span>
        </Link>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="navbar-link">
          Home
        </Link>

        {user && (
          <Link to="/my-bookings" className="navbar-link">
            My Bookings
          </Link>
        )}

        {user?.user_metadata?.role === "ADMIN" && (
          <Link to="/add-resource" className="navbar-link">
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
            Login
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
