
export function calculateAccuracy(correctKeystrokes, mistakes) {
  const totalKeystrokes = correctKeystrokes + mistakes;

  if (totalKeystrokes === 0) {
    return 0;
  }

  return Math.round(
    (correctKeystrokes / totalKeystrokes) * 100
  );
}

export function calculateWpm(correctKeystrokes, elapsedTime) {
  if (elapsedTime <= 0) {
    return 0;
  }

  const minutes = elapsedTime / 60;

  return Math.round(correctKeystrokes / 5 / minutes);
}
