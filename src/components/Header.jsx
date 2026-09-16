import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex w-full items-center justify-between">
      <Link
        to="/"
        className="text-xl font-medium tracking-tight"
      >
        kiflo<span className="text-accent">_</span>
      </Link>

      <button
        type="button"
        aria-label="Open menu"
        className="text-muted transition-colors hover:text-text"
      >
        ☰
      </button>
    </header>
  );
}

export default Header;