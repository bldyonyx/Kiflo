function TypingArea({ mode }) {
  const text =
    mode === "text"
      ? "the quiet glow from the monitor filled the room while the sound of typing echoed softly through the night."
      : `const message = "hello, kiflo";`;

  return (
    <p className="font-mono text-3xl leading-relaxed text-muted">
      {text}
    </p>
  );
}

export default TypingArea;