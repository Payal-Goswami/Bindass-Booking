import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          © {new Date().getFullYear()} Bindass Booking • Built by{" "}
          <span className="footer-name">Payal Goswami</span> ✨
        </p>
      </div>
    </footer>
  );
}
