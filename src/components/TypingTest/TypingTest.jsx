import { useEffect, useState } from "react";
import TestControls from "./TestControls";
import TypingArea from "./TypingArea";
import Results from "./Results";
import useTimer from "../../hooks/useTimer";
import texts from "../../data/texts";
import javascriptSnippets from "../../data/javascriptSnippets";
import getRandomItem from "../../utils/getRandomItem";

function TypingTest() {
  const [mode, setMode] = useState("text");
  const [duration, setDuration] = useState(30);
  const [typedText, setTypedText] = useState("");
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const [text, setText] = useState(() =>
    getRandomItem(texts)
  );

  const {
    timeLeft,
    isRunning,
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
  } = useTimer(duration);

  const getContentForMode = (selectedMode) => {
    const content =
      selectedMode === "text"
        ? texts
        : javascriptSnippets;

    return getRandomItem(content);
  };

  const resetTestState = () => {
    setTypedText("");
    setCorrectKeystrokes(0);
    setMistakes(0);
    setIsFinished(false);
    resetTimer();
  };

  useEffect(() => {
    setText(getContentForMode(mode));
    resetTestState();
  }, [mode]);

  useEffect(() => {
    resetTestState();
  }, [duration]);

  useEffect(() => {
    if (timeLeft === 0 && typedText.length > 0) {
      setIsFinished(true);
    }
  }, [timeLeft, typedText]);

  const finishTest = () => {
    if (typedText.length === 0) {
      return;
    }

    stopTimer();
    setIsFinished(true);
  };

  const restartTest = () => {
    setText(getContentForMode(mode));
    resetTestState();
  };

  const registerCorrectKeystroke = () => {
    setCorrectKeystrokes((current) => current + 1);
  };

  const registerMistake = () => {
    setMistakes((current) => current + 1);
  };

  const totalKeystrokes = correctKeystrokes + mistakes;

  const accuracy =
    totalKeystrokes > 0
      ? Math.round(
          (correctKeystrokes / totalKeystrokes) * 100
        )
      : 0;

  const minutes = elapsedTime / 60;

  const wpm =
    minutes > 0
      ? Math.round(correctKeystrokes / 5 / minutes)
      : 0;

  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <div className="flex w-full max-w-4xl flex-col gap-12">
        <TestControls
          mode={mode}
          onModeChange={setMode}
          duration={duration}
          onDurationChange={setDuration}
        />

        <div className="min-h-48">
          {isFinished ? (
            <Results
              wpm={wpm}
              accuracy={accuracy}
              mistakes={mistakes}
              elapsedTime={elapsedTime}
              onRestart={restartTest}
            />
          ) : (
            <TypingArea
              mode={mode}
              text={text}
              typedText={typedText}
              onTypedTextChange={setTypedText}
              onCorrectKeystroke={registerCorrectKeystroke}
              onMistake={registerMistake}
              timeLeft={timeLeft}
              isRunning={isRunning}
              onStart={startTimer}
              onFinish={finishTest}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default TypingTest;