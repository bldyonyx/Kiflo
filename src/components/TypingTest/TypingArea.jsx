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
      if (event.key === "Enter") {
        event.preventDefault();

        if (typedText.length > 0) {
          onFinish();
        }

        return;
      }

      if (timeLeft === 0) {
        return;
      }

      if (event.key === "Backspace") {
        onTypedTextChange((current) =>
          current.slice(0, -1)
        );
        return;
      }

      if (event.key.length !== 1) {
        return;
      }

      if (!isRunning) {
        onStart();
      }

      onTypedTextChange((current) => {
        if (current.length >= text.length) {
          return current;
        }

        const updatedText = current + event.key;

        if (updatedText.length === text.length) {
          setTimeout(() => {
            onFinish();
          }, 0);
        }

        return updatedText;
      });
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

      <p className="font-mono text-3xl leading-relaxed">
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

          return (
            <span
              key={index}
              className={`relative ${characterClass}`}
            >
              {isCurrentCharacter && (
                <span
                  className="typing-caret absolute -left-[1px] top-[0.15em] h-[1em] w-[2px] bg-accent"
                  aria-hidden="true"
                />
              )}

              {character}
            </span>
          );
        })}
      </p>

      {typedText.length > 0 && (
        <p className="mt-6 font-mono text-xs text-subtle">
          press enter to finish
        </p>
      )}
    </div>
  );
}

export default TypingArea;