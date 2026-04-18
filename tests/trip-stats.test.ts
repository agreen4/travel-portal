import { describe, it, expect } from 'vitest';
import { computeStats } from '../src/utils/trip-stats';

const makeDay = (location: string, hotelName?: string, mealCount = 0) => ({
  date: new Date('2026-05-25'),
  location,
  accommodation: hotelName ? { name: hotelName } : undefined,
  activities: [],
  meals: Array.from({ length: mealCount }, (_, i) => ({
    id: `meal-${i}`,
    restaurant: `Restaurant ${i}`,
  })),
});

describe('computeStats', () => {
  it('counts unique cities', () => {
    const days = [makeDay('Tokyo'), makeDay('Tokyo'), makeDay('Kyoto')];
    expect(computeStats(days).cities).toBe(2);
  });

  it('counts nights as number of days', () => {
    const days = [makeDay('Tokyo'), makeDay('Kyoto')];
    expect(computeStats(days).nights).toBe(2);
  });

  it('counts unique hotels', () => {
    const days = [makeDay('Tokyo', 'Hotel A'), makeDay('Tokyo', 'Hotel A'), makeDay('Kyoto', 'Hotel B')];
    expect(computeStats(days).hotels).toBe(2);
  });

  it('counts total restaurant visits across all days', () => {
    const days = [makeDay('Tokyo', undefined, 2), makeDay('Kyoto', undefined, 3)];
    expect(computeStats(days).restaurants).toBe(5);
  });

  it('handles days with no accommodation', () => {
    const days = [makeDay('Tokyo'), makeDay('Kyoto', 'Hotel B')];
    expect(computeStats(days).hotels).toBe(1);
  });

  it('returns zeros for empty trip', () => {
    expect(computeStats([])).toEqual({ cities: 0, nights: 0, hotels: 0, restaurants: 0 });
  });
});
