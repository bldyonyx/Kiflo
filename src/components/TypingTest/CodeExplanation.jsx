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
    <div className={`flex justify-center ${fontClass}`}>
      <div className="w-full max-w-2xl overflow-hidden min-[1800px]:max-w-[78rem]">
        <p className="mb-8 text-sm text-accent sm:mb-10 min-[1800px]:mb-12 min-[1800px]:text-base">
          {"<>"} understand this code
        </p>

        <pre className="mb-8 max-w-full whitespace-pre-wrap break-words text-xl leading-relaxed text-text [overflow-wrap:anywhere] [tab-size:2] sm:mb-10 sm:text-2xl min-[1800px]:mb-12 min-[1800px]:text-[clamp(2rem,1.25vw,2.75rem)]">
          {snippet.code}
        </pre>

        <p className="max-w-lg text-sm leading-7 text-muted min-[1800px]:max-w-2xl min-[1800px]:text-base min-[1800px]:leading-8">
          {snippet.explanation}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-xs text-subtle min-[1800px]:mt-8 min-[1800px]:gap-x-4 min-[1800px]:text-sm">
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

        <div className="mt-10 flex flex-wrap items-center gap-3 sm:mt-12 min-[1800px]:mt-14 min-[1800px]:gap-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-md border border-subtle px-4 py-2 text-sm text-muted transition-colors hover:border-muted hover:text-text min-[1800px]:px-5 min-[1800px]:py-2.5 min-[1800px]:text-base"
          >
            ← results
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="rounded-md border border-accent px-4 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-background min-[1800px]:px-5 min-[1800px]:py-2.5 min-[1800px]:text-base"
          >
            ↻ try another
          </button>
        </div>
      </div>
    </div>
  );
}

export default CodeExplanation;
