import { useEffect, useState } from "react";

function TypingArea({ mode }) {
  const text =
    mode === "text"
      ? "the quiet glow from the monitor filled the room while the sound of typing echoed softly through the night."
      : `const message = "hello, kiflo";`;

  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    setTypedText("");
  }, [mode]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace") {
        setTypedText((current) => current.slice(0, -1));
        return;
      }

      if (event.key.length !== 1) {
        return;
      }

      setTypedText((current) => {
        if (current.length >= text.length) {
          return current;
        }

        return current + event.key;
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [text]);

  return (
    <p className="font-mono text-3xl leading-relaxed">
      {text.split("").map((character, index) => {
        const typedCharacter = typedText[index];
        const isCurrentCharacter = index === typedText.length;

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
  );
}

export default TypingArea;