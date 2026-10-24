
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
import useTypingTest from "../src/hooks/useTypingTest";

describe("useTypingTest", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("initializes a text test with default values", () => {
    const { result } = renderHook(() => useTypingTest());

    expect(result.current.mode).toBe("text");
    expect(result.current.duration).toBe(30);
    expect(result.current.timeLeft).toBe(30);
    expect(result.current.typedText).toBe("");
    expect(result.current.mistakes).toBe(0);
    expect(result.current.accuracy).toBe(0);
    expect(result.current.wpm).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isFinished).toBe(false);
    expect(result.current.text.length).toBeGreaterThan(0);
  });

  it("calculates accuracy from all recorded keystrokes", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      result.current.registerCorrectKeystroke();
      result.current.registerCorrectKeystroke();
      result.current.registerCorrectKeystroke();
      result.current.registerMistake();
    });

    expect(result.current.mistakes).toBe(1);
    expect(result.current.accuracy).toBe(75);
  });

  it("does not erase mistake history after text correction", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      result.current.setTypedText("cax");
      result.current.registerCorrectKeystroke();
      result.current.registerCorrectKeystroke();
      result.current.registerMistake();
    });

    act(() => {
      result.current.setTypedText("ca");
    });

    expect(result.current.typedText).toBe("ca");
    expect(result.current.mistakes).toBe(1);
    expect(result.current.accuracy).toBe(67);
  });

  it("resets text and statistics on restart", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      result.current.setTypedText("abc");
      result.current.registerCorrectKeystroke();
      result.current.registerMistake();
      result.current.finishTest();
    });

    expect(result.current.isFinished).toBe(true);

    act(() => {
      result.current.restartTest();
    });

    expect(result.current.typedText).toBe("");
    expect(result.current.mistakes).toBe(0);
    expect(result.current.accuracy).toBe(0);
    expect(result.current.wpm).toBe(0);
    expect(result.current.timeLeft).toBe(30);
    expect(result.current.isFinished).toBe(false);
  });

  it("switches to JavaScript and resets the test", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      result.current.setTypedText("abc");
      result.current.registerMistake();
      result.current.setMode("javascript");
    });

    expect(result.current.mode).toBe("javascript");
    expect(result.current.currentSnippet).not.toBeNull();
    expect(result.current.text).toBe(
      result.current.currentSnippet.code
    );
    expect(result.current.typedText).toBe("");
    expect(result.current.mistakes).toBe(0);
    expect(result.current.timeLeft).toBe(30);
    expect(result.current.isFinished).toBe(false);
  });

  it("changes duration and resets the timer", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      result.current.setTypedText("abc");
      result.current.registerMistake();
      result.current.setDuration(60);
    });

    expect(result.current.duration).toBe(60);
    expect(result.current.timeLeft).toBe(60);
    expect(result.current.typedText).toBe("");
    expect(result.current.mistakes).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(window.localStorage.getItem("kiflo-duration")).toBe(
      "60"
    );
  });

  it("finishes when the selected time expires", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      result.current.setTypedText("a");
      result.current.registerCorrectKeystroke();
      result.current.startTimer();
    });

    act(() => {
      vi.advanceTimersByTime(30000);
    });

    expect(result.current.timeLeft).toBe(0);
    expect(result.current.elapsedTime).toBe(30);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isFinished).toBe(true);
  });

  it("stops and preserves statistics on early completion", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      result.current.startTimer();
      result.current.registerCorrectKeystroke();
      result.current.registerCorrectKeystroke();
      result.current.registerCorrectKeystroke();
      result.current.registerCorrectKeystroke();
      result.current.registerCorrectKeystroke();
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    act(() => {
      result.current.finishTest();
    });

    expect(result.current.isFinished).toBe(true);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.elapsedTime).toBeCloseTo(3, 1);
    expect(result.current.accuracy).toBe(100);
    expect(result.current.wpm).toBe(20);
  });
});
