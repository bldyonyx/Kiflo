import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";

function Header({
  fontMode,
  onFontModeChange,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header className="flex w-full items-center justify-between gap-4 min-[1800px]:gap-6">
        <Link
          to="/"
          className="text-xl font-medium tracking-tight min-[1800px]:text-2xl min-[2400px]:text-[1.7rem]"
        >
          kiflo<span className="text-accent">_</span>
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          aria-controls="kiflo-menu"
          onClick={() => setIsMenuOpen(true)}
          className="flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-text focus:outline-none focus-visible:text-accent min-[1800px]:h-12 min-[1800px]:w-12"
        >
          <span
            className="flex w-5 flex-col gap-1.5 min-[1800px]:w-6 min-[1800px]:gap-2"
            aria-hidden="true"
          >
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
          </span>
        </button>
      </header>

      <SideMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        fontMode={fontMode}
        onFontModeChange={onFontModeChange}
      />
    </>
  );
}

export default Header;
