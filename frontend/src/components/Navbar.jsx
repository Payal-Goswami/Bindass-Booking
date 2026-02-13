// import { Link, useNavigate } from 'react-router-dom';
// import { supabase } from '../auth/supabase';
// import { useEffect, useState } from 'react';

// export default function Navbar() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     supabase.auth.getUser().then(({ data }) => {
//       console.log("USER : 🔥 ", data.user);
//       setUser(data.user);
//     });

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setUser(session?.user || null);
//       }
//     );

//     return () => listener.subscription.unsubscribe();
//   }, []);

//   async function handleLogout() {
//     await supabase.auth.signOut();
//     navigate('/login');
//   }

//   return (
//     <nav style={{ display: 'flex', gap: 20, padding: 20 }}>
//       <b>Bindass Booking</b>

//       <Link to="/">Home</Link>

//       {user && <Link to="/my-bookings">My Bookings</Link>}
//       {user?.user_metadata?.role === 'ADMIN' && (
//   <Link to="/add-resource">Add Resource</Link>
// )}
//       <div style={{ marginLeft: 'auto' }}>
//         {user ? (
//           <button onClick={handleLogout}>Logout</button>
//         ) : (
//           <Link to="/login">Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// }


import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../auth/supabase';
import { useEffect, useState } from 'react';
import '../styles/Navbar.css';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">Bindass Booking</div>

      <Link to="/" className="navbar-link">Home</Link>

      {user && (
        <Link to="/my-bookings" className="navbar-link">
          My Bookings
        </Link>
      )}

      {user?.user_metadata?.role === 'ADMIN' && (
        <Link to="/add-resource" className="navbar-link">
          Add Resource
        </Link>
      )}

      <div className="navbar-right">
        {user ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="navbar-link">Login</Link>
        )}
      </div>
    </nav>
  );
}
