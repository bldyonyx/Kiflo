
import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateAccuracy,
  calculateWpm,
} from "../src/utils/typingStats.js";

test("accuracy is 0 when no keys were pressed", () => {
  assert.equal(calculateAccuracy(0, 0), 0);
});

test("accuracy is 100 when all keystrokes are correct", () => {
  assert.equal(calculateAccuracy(10, 0), 100);
});

test("corrected mistakes still count against accuracy", () => {
  // Expected text: cat
  // Typed: c, a, x, Backspace, t
  assert.equal(calculateAccuracy(3, 1), 75);
});

test("accuracy rounds to the nearest integer", () => {
  assert.equal(calculateAccuracy(2, 1), 67);
});

test("WPM is 0 when no time has elapsed", () => {
  assert.equal(calculateWpm(10, 0), 0);
});

test("WPM is 0 when no correct keys were pressed", () => {
  assert.equal(calculateWpm(0, 30), 0);
});

test("WPM is calculated from correct keystrokes", () => {
  // 50 correct characters in 30 seconds = 20 WPM
  assert.equal(calculateWpm(50, 30), 20);
});

test("WPM supports tests completed before the timer ends", () => {
  // 25 correct characters in 15 seconds = 20 WPM
  assert.equal(calculateWpm(25, 15), 20);
});

test("WPM rounds to the nearest integer", () => {
  assert.equal(calculateWpm(17, 30), 7);
});
