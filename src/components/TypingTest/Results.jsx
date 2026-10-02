function Results({
  wpm,
  accuracy,
  mistakes,
  elapsedTime,
  onRestart,
}) {
  return (
    <div className="flex flex-col items-center gap-8 font-mono">
      <p className="text-sm text-muted">
        test complete
      </p>

      <div className="flex items-center gap-12">
        <div className="text-center">
          <p className="text-4xl text-accent">
            {wpm}
          </p>
          <p className="mt-2 text-sm text-muted">
            wpm
          </p>
        </div>

        <div className="text-center">
          <p className="text-4xl text-text">
            {accuracy}%
          </p>
          <p className="mt-2 text-sm text-muted">
            accuracy
          </p>
        </div>

        <div className="text-center">
          <p className="text-4xl text-error">
            {mistakes}
          </p>
          <p className="mt-2 text-sm text-muted">
            mistakes
          </p>
        </div>
      </div>

      <p className="text-sm text-subtle">
        {elapsedTime.toFixed(1)}s
      </p>

      <button
        type="button"
        onClick={onRestart}
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        ↻ try again
      </button>
    </div>
  );
}

export default Results;