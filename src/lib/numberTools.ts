export function getFixedNumber(digitCount: number, value?: number) {
  return Number(value ?? 0).toFixed(digitCount);
}
