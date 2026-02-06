export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <p>PASTR - MINIMALIST PASTEBIN</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
