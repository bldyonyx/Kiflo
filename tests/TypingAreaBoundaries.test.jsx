
/* @vitest-environment jsdom */

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { useState } from "react";
import TypingArea from "../src/components/TypingTest/TypingArea";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function TestHarness({ onFinish = vi.fn(), onMistake = vi.fn() }) {
  const [typedText, setTypedText] = useState("");

  return (
    <TypingArea
      text="cat"
      mode="text"
      typedText={typedText}
      onTypedTextChange={setTypedText}
      onCorrectKeystroke={vi.fn()}
      onMistake={onMistake}
      timeLeft={30}
      isRunning={false}
      onStart={vi.fn()}
      onFinish={onFinish}
      textSize="medium"
      textSpacing="normal"
      fontMode="default"
    />
  );
}

describe("TypingArea boundaries", () => {
  it("does not finish on an incorrect final character", () => {
    const onFinish = vi.fn();

    render(<TestHarness onFinish={onFinish} />);

    fireEvent.keyDown(window, { key: "c" });
    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyDown(window, { key: "x" });

    expect(onFinish).not.toHaveBeenCalled();
    expect(screen.getByTestId("end-caret")).toBeTruthy();
  });

  it("does not accept characters beyond text length", () => {
    const onMistake = vi.fn();

    render(<TestHarness onMistake={onMistake} />);

    fireEvent.keyDown(window, { key: "c" });
    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyDown(window, { key: "x" });
    fireEvent.keyDown(window, { key: "y" });

    expect(onMistake).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("end-caret")).toBeTruthy();
  });

  it("allows correcting the final character", () => {
    const onFinish = vi.fn();

    render(<TestHarness onFinish={onFinish} />);

    fireEvent.keyDown(window, { key: "c" });
    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyDown(window, { key: "x" });

    fireEvent.keyDown(window, { key: "Backspace" });
    fireEvent.keyDown(window, { key: "t" });

    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("end-caret")).toBeNull();
  });
});
