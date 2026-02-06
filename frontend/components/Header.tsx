import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            <div className="logo-icon">P</div>
            <span>PASTR</span>
          </Link>

          <nav className="nav">
            <Link href="/pastes" className="btn">
              All Pastes
            </Link>
            <Link href="/" className="btn">
              New Paste
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
