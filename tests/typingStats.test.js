
import { describe, expect, it } from "vitest";

import {
  calculateAccuracy,
  calculateWpm,
} from "../src/utils/typingStats";

describe("Typing statistics", () => {
  it("returns 0 accuracy when no keys were pressed", () => {
    expect(calculateAccuracy(0, 0)).toBe(0);
  });

  it("returns 100 accuracy when all keystrokes are correct", () => {
    expect(calculateAccuracy(10, 0)).toBe(100);
  });

  it("keeps corrected mistakes in accuracy", () => {
    // Expected: cat
    // Typed: c, a, x, Backspace, t
    expect(calculateAccuracy(3, 1)).toBe(75);
  });

  it("rounds accuracy to the nearest integer", () => {
    expect(calculateAccuracy(2, 1)).toBe(67);
  });

  it("returns 0 WPM when no time has elapsed", () => {
    expect(calculateWpm(10, 0)).toBe(0);
  });

  it("returns 0 WPM when no correct keys were pressed", () => {
    expect(calculateWpm(0, 30)).toBe(0);
  });

  it("calculates WPM from correct keystrokes", () => {
    // 50 correct characters in 30 seconds = 20 WPM
    expect(calculateWpm(50, 30)).toBe(20);
  });

  it("supports tests completed before the timer ends", () => {
    // 25 correct characters in 15 seconds = 20 WPM
    expect(calculateWpm(25, 15)).toBe(20);
  });

  it("rounds WPM to the nearest integer", () => {
    expect(calculateWpm(17, 30)).toBe(7);
  });
});
