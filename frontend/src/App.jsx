import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Availability from "./pages/Availability";
import MyBookings from "./pages/MyBookings";
import AddResource from "./pages/AddResource";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/resources/:resourceId" element={<Availability />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/add-resource" element={<AddResource />} />
          <Route path="/availability/:resourceId" element={<Availability />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
