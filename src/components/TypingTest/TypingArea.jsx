import {
  useEffect,
  useMemo,
  useRef,
} from "react";
import tokenizeJavaScript from "../../utils/tokenizeJavaScript";

const textSizeClasses = {
  small:
    "text-xl sm:text-2xl min-[1800px]:text-[clamp(1.75rem,1.15vw,2.35rem)]",
  medium:
    "text-2xl sm:text-3xl min-[1800px]:text-[clamp(2.15rem,1.45vw,3rem)]",
  large:
    "text-3xl sm:text-4xl min-[1800px]:text-[clamp(2.65rem,1.8vw,3.75rem)]",
};

const textSpacingClasses = {
  compact: "leading-snug",
  normal: "leading-relaxed",
  relaxed: "leading-loose",
};

const fontClasses = {
  default: "font-mono",
  dyslexic: "font-dyslexic",
  hyperlegible: "font-hyperlegible",
};

function TypingArea({
  text,
  mode,
  typedText,
  onTypedTextChange,
  onCorrectKeystroke,
  onMistake,
  timeLeft,
  isRunning,
  onStart,
  onFinish,
  textSize,
  textSpacing,
  fontMode,
}) {
  const typedTextRef = useRef(typedText);

  useEffect(() => {
    typedTextRef.current = typedText;
  }, [typedText]);

  const syntaxCharacters = useMemo(() => {
    if (mode !== "javascript") {
      return [];
    }

    return tokenizeJavaScript(text);
  }, [mode, text]);

  useEffect(() => {
    const isInteractiveTarget = (target) => {
      if (!(target instanceof Element)) {
        return false;
      }

      return Boolean(
        target.closest(
          'button, a, input, select, textarea, [role="button"], [role="switch"], [contenteditable="true"], [aria-modal="true"]'
        )
      );
    };

    const isModalOpen = () =>
      Boolean(
        document.querySelector(
          '[aria-modal="true"]:not([aria-hidden="true"])'
        )
      );

    const handleKeyDown = (event) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        isInteractiveTarget(event.target) ||
        isModalOpen()
      ) {
        return;
      }

      if (timeLeft === 0) {
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        typedTextRef.current =
          typedTextRef.current.slice(0, -1);
        onTypedTextChange(typedTextRef.current);

        return;
      }

      const currentTypedText =
        typedTextRef.current;

      const expectedCharacter =
        text[currentTypedText.length];

      if (event.key === "Enter") {
        event.preventDefault();

        if (expectedCharacter !== "\n") {
          return;
        }

        if (!isRunning) {
          onStart();
        }

        onCorrectKeystroke();

        const updatedText =
          `${currentTypedText}\n`;

        typedTextRef.current = updatedText;
        onTypedTextChange(updatedText);

        if (
          updatedText.length ===
          text.length
        ) {
          onFinish();
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

      if (
        event.key === expectedCharacter
      ) {
        onCorrectKeystroke();
      } else {
        onMistake();
      }

      const updatedText =
        currentTypedText + event.key;

      typedTextRef.current = updatedText;
      onTypedTextChange(updatedText);

      if (
        updatedText.length ===
        text.length
      ) {
        onFinish();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    text,
    timeLeft,
    isRunning,
    onStart,
    onFinish,
    onCorrectKeystroke,
    onMistake,
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

    if (
      typedCharacter !== character
    ) {
      return "text-error";
    }

    if (mode !== "javascript") {
      return "text-text";
    }

    const syntaxType =
      syntaxCharacters[index]?.type;

    return syntaxType
      ? `syntax-${syntaxType}`
      : "text-text";
  };

  const sizeClass =
    textSizeClasses[textSize] ??
    textSizeClasses.medium;

  const spacingClass =
    textSpacingClasses[textSpacing] ??
    textSpacingClasses.normal;

  const fontClass =
    fontClasses[fontMode] ??
    fontClasses.default;

  return (
    <div className="w-full overflow-hidden">
      <p className="mb-4 font-mono text-sm text-accent min-[1800px]:mb-6 min-[1800px]:text-base min-[2400px]:text-lg">
        {timeLeft}
      </p>

      <pre
        className={`max-w-full whitespace-pre-wrap break-words [overflow-wrap:anywhere] [tab-size:2] ${fontClass} ${sizeClass} ${spacingClass}`}
      >
        {text
          .split("")
          .map(
            (
              character,
              index
            ) => {
              const typedCharacter =
                typedText[index];

              const isCurrentCharacter =
                index ===
                typedText.length;

              const characterClass =
                getCharacterClass(
                  character,
                  typedCharacter,
                  index
                );

              if (
                character === "\n"
              ) {
                return (
                  <span key={index}>
                    {isCurrentCharacter && (
                      <span
                        className="relative inline-block"
                        aria-hidden="true"
                      >
                        <span className="typing-caret absolute left-0 top-[0.1em] h-[1em] w-[2px] bg-accent" />
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
                      className="typing-caret absolute -left-[1px] top-1/2 h-[1em] w-[2px] -translate-y-1/2 bg-accent"
                      aria-hidden="true"
                    />
                  )}

                  {character}
                </span>
              );
            }
          )}
      </pre>
    </div>
  );
}

export default TypingArea;
