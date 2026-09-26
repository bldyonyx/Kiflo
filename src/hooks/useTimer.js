import { useEffect, useRef, useState } from "react";

function useTimer(duration) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  const stopTimer = () => {
    if (!isRunning || !startTimeRef.current) {
      return;
    }

    const elapsed =
      (Date.now() - startTimeRef.current) / 1000;

    setElapsedTime(elapsed);
    setIsRunning(false);
  };

  const startTimer = () => {
    if (isRunning || timeLeft <= 0) {
      return;
    }

    startTimeRef.current = Date.now();
    setIsRunning(true);
  };

  const resetTimer = () => {
    setTimeLeft(duration);
    setElapsedTime(0);
    setIsRunning(false);
    startTimeRef.current = null;
  };

  useEffect(() => {
    resetTimer();
  }, [duration]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalRef.current = setInterval(() => {
      const elapsed =
        (Date.now() - startTimeRef.current) / 1000;

      const remaining = Math.max(
        duration - Math.floor(elapsed),
        0
      );

      setTimeLeft(remaining);

      if (elapsed >= duration) {
        setElapsedTime(duration);
        setIsRunning(false);
      }
    }, 100);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, duration]);

  return {
    timeLeft,
    isRunning,
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
  };
}

export default useTimer;