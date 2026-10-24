
import { useState } from "react";
import useTimer from "./useTimer";
import useLocalStorage from "./useLocalStorage";
import texts from "../data/texts";
import javascriptSnippets from "../data/javascriptSnippets";
import getRandomItem from "../utils/getRandomItem";
import {
  calculateAccuracy,
  calculateWpm,
} from "../utils/typingStats";

function getContentForMode(mode) {
  if (mode === "javascript") {
    return {
      mode: "javascript",
      value: getRandomItem(javascriptSnippets),
    };
  }

  return {
    mode: "text",
    value: getRandomItem(texts),
  };
}

function useTypingTest() {
  const [mode, updateMode] = useState("text");

  const [duration, updateDuration] = useLocalStorage(
    "kiflo-duration",
    30
  );

  const [typedText, setTypedText] = useState("");
  const [correctKeystrokes, setCorrectKeystrokes] =
    useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);

  const [content, setContent] = useState(() =>
    getContentForMode("text")
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

  const resetTestState = (nextDuration = duration) => {
    setTypedText("");
    setCorrectKeystrokes(0);
    setMistakes(0);
    setFinished(false);
    resetTimer(nextDuration);
  };

  const setMode = (newMode) => {
    if (newMode === mode) return;

    updateMode(newMode);
    setContent(getContentForMode(newMode));
    resetTestState();
  };

  const setDuration = (newDuration) => {
    if (newDuration === duration) return;

    updateDuration(newDuration);
    resetTestState(newDuration);
  };

  const restartTest = () => {
    setContent(getContentForMode(mode));
    resetTestState();
  };

  const finishTest = () => {
    stopTimer();
    setFinished(true);
  };

  const registerCorrectKeystroke = () => {
    setCorrectKeystrokes((current) => current + 1);
  };

  const registerMistake = () => {
    setMistakes((current) => current + 1);
  };

  const isFinished =
    finished || (timeLeft === 0 && typedText.length > 0);

  const accuracy = calculateAccuracy(
    correctKeystrokes,
    mistakes
  );

  const wpm = calculateWpm(
    correctKeystrokes,
    elapsedTime
  );

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
