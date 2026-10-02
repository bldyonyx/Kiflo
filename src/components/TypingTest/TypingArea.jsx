import { useEffect } from "react";

function TypingArea({
  text,
  typedText,
  onTypedTextChange,
  timeLeft,
  isRunning,
  onStart,
  onFinish,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (timeLeft === 0) {
        return;
      }

      if (event.key === "Backspace") {
        onTypedTextChange((current) =>
          current.slice(0, -1)
        );
        return;
      }

      const expectedCharacter = text[typedText.length];

      if (event.key === "Enter") {
        event.preventDefault();

        if (expectedCharacter !== "\n") {
          return;
        }

        if (!isRunning) {
          onStart();
        }

        const updatedText = `${typedText}\n`;

        onTypedTextChange(updatedText);

        if (updatedText.length === text.length) {
          setTimeout(onFinish, 0);
        }

        return;
      }

      if (event.key.length !== 1) {
        return;
      }

      if (expectedCharacter === "\n") {
        return;
      }

      if (!isRunning) {
        onStart();
      }

      const updatedText = typedText + event.key;

      onTypedTextChange(updatedText);

      if (updatedText.length === text.length) {
        setTimeout(onFinish, 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    text,
    typedText,
    timeLeft,
    isRunning,
    onStart,
    onFinish,
    onTypedTextChange,
  ]);

  return (
    <div>
      <p className="mb-4 font-mono text-sm text-accent">
        {timeLeft}
      </p>

      <pre className="whitespace-pre-wrap font-mono text-3xl leading-relaxed">
        {text.split("").map((character, index) => {
          const typedCharacter = typedText[index];
          const isCurrentCharacter =
            index === typedText.length;

          let characterClass = "text-muted";

          if (typedCharacter !== undefined) {
            characterClass =
              typedCharacter === character
                ? "text-text"
                : "text-error";
          }

          if (character === "\n") {
            return (
              <span key={index}>
                {isCurrentCharacter && (
                  <span
                    className="relative inline-block"
                    aria-hidden="true"
                  >
                    <span className="typing-caret absolute left-0 top-[0.15em] h-[1em] w-0.5 bg-accent" />
                  </span>
                )}
                {"\n"}
              </span>
            );
          }

          return (
            <span
              key={index}
              className={`relative ${characterClass}`}
            >
              {isCurrentCharacter && (
                <span
                  className="typing-caret absolute -left-px top-[0.15em] h-[1em] w-0.5 bg-accent"
                  aria-hidden="true"
                />
              )}

              {character}
            </span>
          );
        })}
      </pre>
    </div>
  );
}

export default TypingArea;