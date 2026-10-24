
/* @vitest-environment jsdom */

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  act,
  cleanup,
  renderHook,
} from "@testing-library/react";
import useTimer from "../src/hooks/useTimer";

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("starts with the selected duration", () => {
    const { result } = renderHook(() => useTimer(30));

    expect(result.current.timeLeft).toBe(30);
    expect(result.current.elapsedTime).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it("starts only when requested", () => {
    const { result } = renderHook(() => useTimer(30));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.timeLeft).toBe(30);

    act(() => {
      result.current.startTimer();
    });

    expect(result.current.isRunning).toBe(true);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.timeLeft).toBe(25);
  });

  it("does not restart on repeated start calls", () => {
    const { result } = renderHook(() => useTimer(30));

    act(() => {
      result.current.startTimer();
      vi.advanceTimersByTime(5000);
      result.current.startTimer();
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.timeLeft).toBe(20);
  });

  it("stops automatically when time expires", () => {
    const { result } = renderHook(() => useTimer(30));

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      vi.advanceTimersByTime(30000);
    });

    expect(result.current.timeLeft).toBe(0);
    expect(result.current.elapsedTime).toBe(30);
    expect(result.current.isRunning).toBe(false);
  });

  it("preserves elapsed time when stopped early", () => {
    const { result } = renderHook(() => useTimer(30));

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      vi.advanceTimersByTime(12500);
      result.current.stopTimer();
    });

    expect(result.current.elapsedTime).toBeCloseTo(12.5, 1);
    expect(result.current.isRunning).toBe(false);
  });

  it("resets the timer and stops its countdown", () => {
    const { result } = renderHook(() => useTimer(30));

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      vi.advanceTimersByTime(5000);
      result.current.resetTimer();
    });

    expect(result.current.timeLeft).toBe(30);
    expect(result.current.elapsedTime).toBe(0);
    expect(result.current.isRunning).toBe(false);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.timeLeft).toBe(30);
  });

  it("resets to a different duration", () => {
    const { result, rerender } = renderHook(
      ({ duration }) => useTimer(duration),
      {
        initialProps: { duration: 30 },
      }
    );

    rerender({ duration: 60 });

    act(() => {
      result.current.resetTimer(60);
    });

    expect(result.current.timeLeft).toBe(60);
    expect(result.current.elapsedTime).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });
});
