const shortMonth = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

export function formatDateRange(start: Date, end: Date): string {
  if (start.getUTCFullYear() === end.getUTCFullYear()) {
    return `${shortMonth(start)} \u2013 ${shortMonth(end)}, ${start.getUTCFullYear()}`;
  }
  return `${shortMonth(start)}, ${start.getUTCFullYear()} \u2013 ${shortMonth(end)}, ${end.getUTCFullYear()}`;
}

export function formatDay(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
}

export function formatYear(date: Date): string {
  return String(date.getUTCFullYear());
}
