const durations = [30, 60, 120];

function TestControls({
  mode,
  onModeChange,
  duration,
  onDurationChange,
}) {
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

      <button
        type="button"
        aria-label="Text settings"
        className="text-muted transition-colors hover:text-text"
      >
        Aa
      </button>
    </div>
  );
}

export default TestControls;