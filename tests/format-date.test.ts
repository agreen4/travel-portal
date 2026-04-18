import { describe, it, expect } from 'vitest';
import { formatDateRange, formatDay, formatYear } from '../src/utils/format-date';

describe('formatDateRange', () => {
  it('formats same-year range', () => {
    expect(formatDateRange(new Date('2026-05-25'), new Date('2026-06-12')))
      .toBe('May 25 – Jun 12, 2026');
  });

  it('formats cross-year range', () => {
    expect(formatDateRange(new Date('2026-12-28'), new Date('2027-01-05')))
      .toBe('Dec 28, 2026 – Jan 5, 2027');
  });
});

describe('formatDay', () => {
  it('formats a date as weekday + month + day', () => {
    const result = formatDay(new Date('2026-05-25'));
    expect(result).toMatch(/Monday, May 25/);
  });
});

describe('formatYear', () => {
  it('returns the year as a string', () => {
    expect(formatYear(new Date('2026-05-25'))).toBe('2026');
  });
});
