import { useEffect } from "react";

function SideMenu({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-sm flex-col border-l border-subtle bg-background px-8 py-8 transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium tracking-tight">
            kiflo<span className="text-accent">_</span>
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="font-mono text-lg text-muted transition-colors hover:text-text"
          >
            ×
          </button>
        </div>

        <div className="mt-14 font-mono">
          <section>
            <p className="mb-5 text-xs text-subtle">
              accessibility
            </p>

            <button
              type="button"
              className="flex w-full items-center justify-between text-sm text-muted transition-colors hover:text-text"
            >
              <span>dyslexia-friendly font</span>

              <span
                className="h-3 w-3 rounded-full border border-muted"
                aria-hidden="true"
              />
            </button>
          </section>

          <section className="mt-10">
            <p className="mb-5 text-xs text-subtle">
              sound
            </p>

            <button
              type="button"
              className="flex w-full items-center justify-between text-sm text-muted transition-colors hover:text-text"
            >
              <span>typing sounds</span>

              <span
                className="h-3 w-3 rounded-full border border-muted"
                aria-hidden="true"
              />
            </button>
          </section>

          <div className="my-10 h-px bg-subtle" />

          <section>
            <p className="text-sm leading-7 text-muted">
              a typing speed test for practicing with
              text and code.
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