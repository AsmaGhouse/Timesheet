// Utility functions

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

export function calculateProgress(current: number, target: number): number {
  return Math.min((current / target) * 100, 100);
}
