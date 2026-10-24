import { useState } from "react";
import TestControls from "./TestControls";
import TypingArea from "./TypingArea";
import Results from "./Results";
import CodeExplanation from "./CodeExplanation";
import useTypingTest from "../../hooks/useTypingTest";
import useLocalStorage from "../../hooks/useLocalStorage";

function TypingTest({ fontMode }) {
  const [textSize, setTextSize] =
    useLocalStorage(
      "kiflo-text-size",
      "medium"
    );

  const [textSpacing, setTextSpacing] =
    useLocalStorage(
      "kiflo-text-spacing",
      "normal"
    );

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
    <section className="flex flex-1 flex-col items-center justify-center py-8 sm:py-10 min-[1800px]:py-14 min-[2400px]:py-16">
      <div className="flex w-full max-w-4xl flex-col gap-8 sm:gap-10 lg:gap-12 min-[1800px]:max-w-[78rem] min-[1800px]:gap-16 min-[2400px]:max-w-[86rem] min-[2400px]:gap-20">
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

        <div className="min-h-[24rem] w-full sm:min-h-[26rem] min-[1800px]:min-h-[34rem] min-[2400px]:min-h-[38rem]">
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
