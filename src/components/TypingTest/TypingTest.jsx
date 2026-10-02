import { useState } from "react";
import TestControls from "./TestControls";
import TypingArea from "./TypingArea";
import Results from "./Results";
import CodeExplanation from "./CodeExplanation";
import useTypingTest from "../../hooks/useTypingTest";

function TypingTest({ fontMode }) {
  const [textSize, setTextSize] =
    useState("medium");
  const [textSpacing, setTextSpacing] =
    useState("normal");
  const [
    showExplanation,
    setShowExplanation,
  ] = useState(false);

  const {
    mode,
    setMode,
    duration,
    setDuration,
    content,
    text,
    currentSnippet,
    typedText,
    setTypedText,
    mistakes,
    isFinished,
    timeLeft,
    isRunning,
    elapsedTime,
    wpm,
    accuracy,
    startTimer,
    finishTest,
    restartTest,
    registerCorrectKeystroke,
    registerMistake,
  } = useTypingTest();

  const handleModeChange = (newMode) => {
    setShowExplanation(false);
    setMode(newMode);
  };

  const handleDurationChange = (
    newDuration
  ) => {
    setShowExplanation(false);
    setDuration(newDuration);
  };

  const handleRestart = () => {
    setShowExplanation(false);
    restartTest();
  };

  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <div className="flex w-full max-w-4xl flex-col gap-12">
        <TestControls
          mode={mode}
          onModeChange={handleModeChange}
          duration={duration}
          onDurationChange={
            handleDurationChange
          }
          textSize={textSize}
          onTextSizeChange={
            setTextSize
          }
          textSpacing={textSpacing}
          onTextSpacingChange={
            setTextSpacing
          }
        />

        <div className="min-h-48">
          {showExplanation &&
          currentSnippet ? (
            <CodeExplanation
              snippet={currentSnippet}
              onBack={() =>
                setShowExplanation(
                  false
                )
              }
              onRestart={handleRestart}
              fontMode={fontMode}
            />
          ) : isFinished ? (
            <Results
              wpm={wpm}
              accuracy={accuracy}
              mistakes={mistakes}
              elapsedTime={
                elapsedTime
              }
              snippet={
                currentSnippet
              }
              onUnderstand={() =>
                setShowExplanation(
                  true
                )
              }
              onRestart={handleRestart}
            />
          ) : (
            <TypingArea
              mode={content.mode}
              text={text}
              typedText={typedText}
              onTypedTextChange={
                setTypedText
              }
              onCorrectKeystroke={
                registerCorrectKeystroke
              }
              onMistake={
                registerMistake
              }
              timeLeft={timeLeft}
              isRunning={isRunning}
              onStart={startTimer}
              onFinish={finishTest}
              textSize={textSize}
              textSpacing={
                textSpacing
              }
              fontMode={fontMode}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default TypingTest;