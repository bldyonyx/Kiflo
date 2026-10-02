const fontClasses = {
  default: "font-mono",
  dyslexic: "font-dyslexic",
  hyperlegible: "font-hyperlegible",
};

function CodeExplanation({
  snippet,
  onBack,
  onRestart,
  fontMode,
}) {
  const fontClass =
    fontClasses[fontMode] ??
    fontClasses.default;

  return (
    <div
      className={`flex justify-center ${fontClass}`}
    >
      <div className="w-full max-w-2xl">
        <p className="mb-10 text-sm text-accent">
          {"<>"} understand this code
        </p>

        <pre className="mb-10 whitespace-pre-wrap text-2xl leading-relaxed text-text">
          {snippet.code}
        </pre>

        <p className="max-w-lg text-sm leading-7 text-muted">
          {snippet.explanation}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-xs text-subtle">
          {snippet.concepts.map(
            (concept, index) => (
              <span key={concept}>
                {concept}

                {index <
                  snippet.concepts.length -
                    1 && (
                  <span className="ml-3">
                    ·
                  </span>
                )}
              </span>
            )
          )}
        </div>

        <div className="mt-12 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-md border border-subtle px-4 py-2 text-sm text-muted transition-colors hover:border-muted hover:text-text"
          >
            ← results
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="rounded-md border border-accent px-4 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-background"
          >
            ↻ try another
          </button>
        </div>
      </div>
    </div>
  );
}

export default CodeExplanation;