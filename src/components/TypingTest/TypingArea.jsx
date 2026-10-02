import { useEffect, useMemo } from "react";
import tokenizeJavaScript from "../../utils/tokenizeJavaScript";

function TypingArea({
  text,
  mode,
  typedText,
  onTypedTextChange,
  timeLeft,
  isRunning,
  onStart,
  onFinish,
}) {
  const syntaxCharacters = useMemo(() => {
    if (mode !== "javascript") {
      return [];
    }

    return tokenizeJavaScript(text);
  }, [mode, text]);

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

  const getCharacterClass = (
    character,
    typedCharacter,
    index
  ) => {
    if (typedCharacter === undefined) {
      return "text-muted";
    }

    if (typedCharacter !== character) {
      return "text-error";
    }

    if (mode !== "javascript") {
      return "text-text";
    }

    const syntaxType = syntaxCharacters[index]?.type;

    return syntaxType
      ? `syntax-${syntaxType}`
      : "text-text";
  };

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

          const characterClass = getCharacterClass(
            character,
            typedCharacter,
            index
          );

          if (character === "\n") {
            return (
              <span key={index}>
                {isCurrentCharacter && (
                  <span
                    className="relative inline-block"
                    aria-hidden="true"
                  >
                    <span className="typing-caret absolute left-0 top-[0.15em] h-[1em] w-0.5g-accent" />
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