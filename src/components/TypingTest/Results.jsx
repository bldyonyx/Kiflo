function Results({
  wpm,
  accuracy,
  mistakes,
  elapsedTime,
  snippet,
  onUnderstand,
  onRestart,
}) {
  return (
    <div className="flex flex-col items-center gap-7 font-mono sm:gap-8 min-[1800px]:gap-10">
      <p className="text-sm text-muted min-[1800px]:text-base">
        test complete
      </p>

      <div className="grid w-full max-w-xl grid-cols-3 gap-4 sm:gap-8 min-[1800px]:max-w-3xl min-[1800px]:gap-12">
        <div className="text-center">
          <p className="text-3xl text-accent sm:text-4xl min-[1800px]:text-[clamp(3rem,2.4vw,4.75rem)]">
            {wpm}
          </p>

          <p className="mt-2 text-sm text-muted min-[1800px]:mt-3 min-[1800px]:text-base">
            wpm
          </p>
        </div>

        <div className="text-center">
          <p className="text-3xl text-text sm:text-4xl min-[1800px]:text-[clamp(3rem,2.4vw,4.75rem)]">
            {accuracy}%
          </p>

          <p className="mt-2 text-sm text-muted min-[1800px]:mt-3 min-[1800px]:text-base">
            accuracy
          </p>
        </div>

        <div className="text-center">
          <p className="text-3xl text-error sm:text-4xl min-[1800px]:text-[clamp(3rem,2.4vw,4.75rem)]">
            {mistakes}
          </p>

          <p className="mt-2 text-sm text-muted min-[1800px]:mt-3 min-[1800px]:text-base">
            mistakes
          </p>
        </div>
      </div>

      <p className="text-sm text-subtle min-[1800px]:text-base">
        {elapsedTime.toFixed(1)}s
      </p>

      {snippet && (
        <button
          type="button"
          onClick={onUnderstand}
          className="text-sm text-accent transition-opacity hover:opacity-70 min-[1800px]:text-base"
        >
          {"<>"} understand this code
        </button>
      )}

      <button
        type="button"
        onClick={onRestart}
        className="text-sm text-muted transition-colors hover:text-accent min-[1800px]:text-base"
      >
        ↻ try again
      </button>
    </div>
  );
}

export default Results;
