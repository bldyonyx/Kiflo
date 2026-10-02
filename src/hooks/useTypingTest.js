import { useEffect, useState } from "react";
import useTimer from "./useTimer";
import useLocalStorage from "./useLocalStorage";
import texts from "../data/texts";
import javascriptSnippets from "../data/javascriptSnippets";
import getRandomItem from "../utils/getRandomItem";

function getContentForMode(mode) {
  if (mode === "javascript") {
    return {
      mode: "javascript",
      value: getRandomItem(
        javascriptSnippets
      ),
    };
  }

  return {
    mode: "text",
    value: getRandomItem(texts),
  };
}

function useTypingTest() {
  const [mode, setMode] = useState("text");

  const [duration, setDuration] =
    useLocalStorage(
      "kiflo-duration",
      30
    );

  const [typedText, setTypedText] =
    useState("");

  const [
    correctKeystrokes,
    setCorrectKeystrokes,
  ] = useState(0);

  const [mistakes, setMistakes] =
    useState(0);

  const [isFinished, setIsFinished] =
    useState(false);

  const [content, setContent] = useState(
    () => getContentForMode("text")
  );

  const {
    timeLeft,
    isRunning,
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
  } = useTimer(duration);

  const text =
    content.mode === "javascript"
      ? content.value.code
      : content.value;

  const currentSnippet =
    content.mode === "javascript"
      ? content.value
      : null;

  const resetTestState = () => {
    setTypedText("");
    setCorrectKeystrokes(0);
    setMistakes(0);
    setIsFinished(false);
    resetTimer();
  };

  useEffect(() => {
    setContent(getContentForMode(mode));
    resetTestState();
  }, [mode]);

  useEffect(() => {
    resetTestState();
  }, [duration]);

  useEffect(() => {
    if (
      timeLeft === 0 &&
      typedText.length > 0
    ) {
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
    setContent(getContentForMode(mode));
    resetTestState();
  };

  const registerCorrectKeystroke = () => {
    setCorrectKeystrokes(
      (current) => current + 1
    );
  };

  const registerMistake = () => {
    setMistakes(
      (current) => current + 1
    );
  };

  const totalKeystrokes =
    correctKeystrokes + mistakes;

  const accuracy =
    totalKeystrokes > 0
      ? Math.round(
          (correctKeystrokes /
            totalKeystrokes) *
            100
        )
      : 0;

  const minutes = elapsedTime / 60;

  const wpm =
    minutes > 0
      ? Math.round(
          correctKeystrokes /
            5 /
            minutes
        )
      : 0;

  return {
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
  };
}

export default useTypingTest;