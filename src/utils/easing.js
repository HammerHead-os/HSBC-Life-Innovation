/** Smooth ease-in-out — no sudden starts or stops. */
export function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
}
