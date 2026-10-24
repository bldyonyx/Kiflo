
import { useEffect, useRef, useState } from "react";

function useTimer(duration) {
  const [timer, setTimer] = useState({
    timeLeft: duration,
    elapsedTime: 0,
    isRunning: false,
  });

  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const runningRef = useRef(false);

  const clearTimerInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = () => {
    if (runningRef.current || timer.timeLeft <= 0) {
      return;
    }

    runningRef.current = true;
    startTimeRef.current = performance.now();

    setTimer((current) => ({
      ...current,
      isRunning: true,
    }));
  };

  const stopTimer = () => {
    if (!runningRef.current || startTimeRef.current === null) {
      return;
    }

    const elapsed = Math.min(
      (performance.now() - startTimeRef.current) / 1000,
      duration
    );

    runningRef.current = false;
    clearTimerInterval();

    setTimer({
      timeLeft: Math.max(duration - Math.floor(elapsed), 0),
      elapsedTime: elapsed,
      isRunning: false,
    });
  };

  const resetTimer = (nextDuration = duration) => {
    runningRef.current = false;
    startTimeRef.current = null;
    clearTimerInterval();

    setTimer({
      timeLeft: nextDuration,
      elapsedTime: 0,
      isRunning: false,
    });
  };

  useEffect(() => {
    if (!timer.isRunning) {
      return;
    }

    intervalRef.current = setInterval(() => {
      if (startTimeRef.current === null) {
        return;
      }

      const elapsed =
        (performance.now() - startTimeRef.current) / 1000;

      if (elapsed >= duration) {
        runningRef.current = false;
        clearTimerInterval();

        setTimer({
          timeLeft: 0,
          elapsedTime: duration,
          isRunning: false,
        });

        return;
      }

      setTimer((current) => ({
        ...current,
        timeLeft: Math.max(
          duration - Math.floor(elapsed),
          0
        ),
      }));
    }, 100);

    return clearTimerInterval;
  }, [timer.isRunning, duration]);

  useEffect(() => {
    return () => {
      runningRef.current = false;
      clearTimerInterval();
    };
  }, []);

  return {
    ...timer,
    startTimer,
    stopTimer,
    resetTimer,
  };
}

export default useTimer;
