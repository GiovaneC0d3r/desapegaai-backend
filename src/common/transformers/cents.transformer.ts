export function parsePriceToCents(value: string): number {
  const normalized = value.replace(/\./g, '').replace(',', '.'); // "12.90"
  const numeric = parseFloat(normalized);
  return Math.round(numeric * 100);
}
