
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
} from "@testing-library/react";
import { useState } from "react";
import TypingArea from "../src/components/TypingTest/TypingArea";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function TestHarness({
  text = "cat",
  mode = "text",
  onFinish = vi.fn(),
  onCorrectKeystroke = vi.fn(),
  onMistake = vi.fn(),
  onStart = vi.fn(),
}) {
  const [typedText, setTypedText] = useState("");

  return (
    <TypingArea
      text={text}
      mode={mode}
      typedText={typedText}
      onTypedTextChange={setTypedText}
      onCorrectKeystroke={onCorrectKeystroke}
      onMistake={onMistake}
      timeLeft={30}
      isRunning={false}
      onStart={onStart}
      onFinish={onFinish}
      textSize="medium"
      textSpacing="normal"
      fontMode="default"
    />
  );
}

describe("TypingArea keyboard behavior", () => {
  it("counts the final keystroke and finishes the test", () => {
    const onCorrectKeystroke = vi.fn();
    const onFinish = vi.fn();

    render(
      <TestHarness
        onCorrectKeystroke={onCorrectKeystroke}
        onFinish={onFinish}
      />
    );

    fireEvent.keyDown(window, { key: "c" });
    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyDown(window, { key: "t" });

    expect(onCorrectKeystroke).toHaveBeenCalledTimes(3);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it("keeps mistakes in the history after Backspace", () => {
    const onCorrectKeystroke = vi.fn();
    const onMistake = vi.fn();
    const onFinish = vi.fn();

    render(
      <TestHarness
        onCorrectKeystroke={onCorrectKeystroke}
        onMistake={onMistake}
        onFinish={onFinish}
      />
    );

    fireEvent.keyDown(window, { key: "c" });
    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyDown(window, { key: "x" });
    fireEvent.keyDown(window, { key: "Backspace" });
    fireEvent.keyDown(window, { key: "t" });

    expect(onCorrectKeystroke).toHaveBeenCalledTimes(3);
    expect(onMistake).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it("uses Enter for JavaScript line breaks", () => {
    const onCorrectKeystroke = vi.fn();
    const onFinish = vi.fn();

    render(
      <TestHarness
        text={"a\nb"}
        mode="javascript"
        onCorrectKeystroke={onCorrectKeystroke}
        onFinish={onFinish}
      />
    );

    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyDown(window, { key: "Enter" });
    fireEvent.keyDown(window, { key: "b" });

    expect(onCorrectKeystroke).toHaveBeenCalledTimes(3);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it("does not start typing when a button has focus", () => {
    const onStart = vi.fn();
    const onCorrectKeystroke = vi.fn();

    render(
      <TestHarness
        onStart={onStart}
        onCorrectKeystroke={onCorrectKeystroke}
      />
    );

    const button = document.createElement("button");
    document.body.appendChild(button);
    button.focus();

    fireEvent.keyDown(button, { key: "c" });

    expect(onStart).not.toHaveBeenCalled();
    expect(onCorrectKeystroke).not.toHaveBeenCalled();

    button.remove();
  });

  it("ignores browser shortcuts", () => {
    const onStart = vi.fn();

    render(<TestHarness onStart={onStart} />);

    fireEvent.keyDown(window, {
      key: "c",
      ctrlKey: true,
    });

    expect(onStart).not.toHaveBeenCalled();
  });

  it("does not finish when the final character is incorrect", () => {
    const onFinish = vi.fn();

    render(<TestHarness onFinish={onFinish} />);

    fireEvent.keyDown(window, { key: "c" });
    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyDown(window, { key: "x" });

    expect(onFinish).not.toHaveBeenCalled();

    fireEvent.keyDown(window, { key: "Backspace" });
    fireEvent.keyDown(window, { key: "t" });

    expect(onFinish).toHaveBeenCalledTimes(1);
  });
});
