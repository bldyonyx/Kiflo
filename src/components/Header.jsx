import { useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";

function Header({
  fontMode,
  onFontModeChange,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
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
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
          className="text-muted transition-colors hover:text-text"
        >
          ☰
        </button>
      </header>

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        fontMode={fontMode}
        onFontModeChange={onFontModeChange}
      />
    </>
  );
}

export default Header;