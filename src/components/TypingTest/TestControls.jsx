import { useEffect, useRef, useState } from "react";

const durations = [30, 60, 120];

function TestControls({
  mode,
  onModeChange,
  duration,
  onDurationChange,
  textSize,
  onTextSizeChange,
  textSpacing,
  onTextSpacingChange,
}) {
  const [isTextSettingsOpen, setIsTextSettingsOpen] =
    useState(false);

  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target)
      ) {
        setIsTextSettingsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="flex items-center justify-center gap-6 text-sm">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onModeChange("text")}
          className={
            mode === "text"
              ? "text-accent"
              : "text-muted transition-colors hover:text-text"
          }
        >
          text
        </button>

        <button
          type="button"
          onClick={() => onModeChange("javascript")}
          className={
            mode === "javascript"
              ? "text-accent"
              : "text-muted transition-colors hover:text-text"
          }
        >
          javascript
        </button>
      </div>

      <span className="text-subtle">/</span>

      <div className="flex gap-3">
        {durations.map((seconds) => (
          <button
            key={seconds}
            type="button"
            onClick={() => onDurationChange(seconds)}
            className={
              duration === seconds
                ? "text-accent"
                : "text-muted transition-colors hover:text-text"
            }
          >
            {seconds}s
          </button>
        ))}
      </div>

      <span className="text-subtle">/</span>

      <div
        ref={settingsRef}
        className="relative"
      >
        <button
          type="button"
          aria-label="Text settings"
          aria-expanded={isTextSettingsOpen}
          onClick={() =>
            setIsTextSettingsOpen((current) => !current)
          }
          className={
            isTextSettingsOpen
              ? "text-accent"
              : "text-muted transition-colors hover:text-text"
          }
        >
          Aa
        </button>

        {isTextSettingsOpen && (
          <div className="absolute right-0 top-8 z-10 w-64 rounded-md border border-subtle bg-background p-5 font-mono">
            <div>
              <p className="mb-3 text-xs text-muted">
                text size
              </p>

              <div className="flex gap-4">
                {["small", "medium", "large"].map(
                  (size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        onTextSizeChange(size)
                      }
                      className={
                        textSize === size
                          ? "text-xs text-accent"
                          : "text-xs text-subtle transition-colors hover:text-text"
                      }
                    >
                      {size}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="mt-5 border-t border-subtle pt-5">
              <p className="mb-3 text-xs text-muted">
                spacing
              </p>

              <div className="flex gap-4">
                {["compact", "normal", "relaxed"].map(
                  (spacing) => (
                    <button
                      key={spacing}
                      type="button"
                      onClick={() =>
                        onTextSpacingChange(spacing)
                      }
                      className={
                        textSpacing === spacing
                          ? "text-xs text-accent"
                          : "text-xs text-subtle transition-colors hover:text-text"
                      }
                    >
                      {spacing}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestControls;