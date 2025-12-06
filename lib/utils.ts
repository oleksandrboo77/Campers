export function formatPrice(value: number): string {
  if (Number.isNaN(value)) {
    return "0.00";
  }
  return value.toFixed(2);
}
