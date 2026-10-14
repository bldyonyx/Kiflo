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
    document.addEventListener(
      "focusin",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
      document.removeEventListener(
        "focusin",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm sm:gap-x-6 min-[1800px]:gap-x-8 min-[1800px]:gap-y-4 min-[1800px]:text-base min-[2400px]:text-lg">
      <div className="flex items-center gap-3 min-[1800px]:gap-4">
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

      <span className="hidden text-subtle sm:inline">/</span>

      <div className="flex items-center gap-3 min-[1800px]:gap-4">
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

      <span className="hidden text-subtle sm:inline">/</span>

      <div
        ref={settingsRef}
        className="relative flex justify-center"
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
          <div className="absolute left-1/2 top-8 z-10 w-[min(16rem,calc(100vw-2rem))] -translate-x-1/2 rounded-md border border-subtle bg-background p-5 font-mono shadow-[0_18px_60px_rgba(0,0,0,0.45)] sm:left-auto sm:right-0 sm:translate-x-0 min-[1800px]:top-10 min-[1800px]:w-72 min-[1800px]:p-6">
            <div>
              <p className="mb-3 text-xs text-muted">
                text size
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-2">
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

              <div className="flex flex-wrap gap-x-4 gap-y-2">
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
