import { useEffect, useRef } from "react";

function SideMenu({
  isOpen,
  onClose,
  fontMode,
  onFontModeChange,
}) {
  const menuRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (
        event.key !== "Tab" ||
        !menuRef.current
      ) {
        return;
      }

      const focusableElements =
        menuRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    if (isOpen) {
      const previousOverflow =
        document.body.style.overflow;

      document.body.style.overflow = "hidden";
      window.addEventListener(
        "keydown",
        handleKeyDown
      );

      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      return () => {
        document.body.style.overflow =
          previousOverflow;
        window.removeEventListener(
          "keydown",
          handleKeyDown
        );
      };
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  const handleFontChange = (selectedFont) => {
    if (fontMode === selectedFont) {
      onFontModeChange("default");
      return;
    }

    onFontModeChange(selectedFont);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="kiflo-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Kiflo menu"
        inert={!isOpen}
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-sm flex-col overflow-y-auto border-l border-subtle bg-background px-6 py-6 transition-transform duration-300 ease-out sm:px-8 sm:py-8 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium tracking-tight">
            kiflo<span className="text-accent">_</span>
          </p>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center font-mono text-lg text-muted transition-colors hover:text-text focus:outline-none focus-visible:text-accent"
          >
            x
          </button>
        </div>

        <div className="mt-10 font-mono sm:mt-14">
          <section>
            <p className="mb-5 text-xs text-subtle">
              accessibility
            </p>

            <div className="flex flex-col gap-5">
              <button
                type="button"
                role="switch"
                aria-checked={
                  fontMode === "dyslexic"
                }
                onClick={() =>
                  handleFontChange("dyslexic")
                }
                className="flex w-full items-center justify-between text-sm text-muted transition-colors hover:text-text"
              >
                <span>
                  dyslexia-friendly font
                </span>

                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                    fontMode === "dyslexic"
                      ? "border-accent"
                      : "border-muted"
                  }`}
                  aria-hidden="true"
                >
                  {fontMode === "dyslexic" && (
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  )}
                </span>
              </button>

              <button
                type="button"
                role="switch"
                aria-checked={
                  fontMode === "hyperlegible"
                }
                onClick={() =>
                  handleFontChange(
                    "hyperlegible"
                  )
                }
                className="flex w-full items-center justify-between text-sm text-muted transition-colors hover:text-text"
              >
                <span>hyperlegible font</span>

                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                    fontMode === "hyperlegible"
                      ? "border-accent"
                      : "border-muted"
                  }`}
                  aria-hidden="true"
                >
                  {fontMode ===
                    "hyperlegible" && (
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  )}
                </span>
              </button>
            </div>
          </section>

          <div className="my-10 h-px bg-subtle" />

          <section>
            <p className="text-sm leading-7 text-muted">
              a typing speed test for practicing
              with text and code.
            </p>

            <p className="mt-3 text-xs leading-6 text-subtle">
              find your key flow.
            </p>
          </section>
        </div>

        <div className="mt-auto font-mono">
          <a
            href="https://github.com/bldyonyx/Kiflo"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            github ↗
          </a>
        </div>
      </aside>
    </>
  );
}

export default SideMenu;
