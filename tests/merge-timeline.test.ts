import { describe, it, expect } from 'vitest';
import { mergeTimeline } from '../src/utils/merge-timeline';

const d = (s: string) => new Date(s + 'T00:00:00Z');

describe('mergeTimeline', () => {
  it('sorts plan and diary items by date ascending', () => {
    const result = mergeTimeline(
      [{ date: d('2026-05-28') }, { date: d('2026-05-26') }],
      [{ date: d('2026-05-27') }]
    );
    expect(result.map(i => i.date.toISOString().slice(0, 10))).toEqual([
      '2026-05-26', '2026-05-27', '2026-05-28',
    ]);
  });

  it('on same date, plan comes before diary', () => {
    const result = mergeTimeline([{ date: d('2026-05-26') }], [{ date: d('2026-05-26') }]);
    expect(result[0].type).toBe('plan');
    expect(result[1].type).toBe('diary');
  });

  it('preserves extra properties on plan items', () => {
    const result = mergeTimeline([{ date: d('2026-05-26'), location: 'Tokyo' }], []);
    expect((result[0] as any).location).toBe('Tokyo');
  });

  it('preserves extra properties on diary items', () => {
    const result = mergeTimeline([], [{ date: d('2026-05-26'), title: 'Arrival' }]);
    expect((result[0] as any).title).toBe('Arrival');
  });

  it('returns only plan items when diary is empty', () => {
    const result = mergeTimeline([{ date: d('2026-05-26') }, { date: d('2026-05-27') }], []);
    expect(result).toHaveLength(2);
    expect(result.every(i => i.type === 'plan')).toBe(true);
  });

  it('returns only diary items when plan is empty', () => {
    const result = mergeTimeline([], [{ date: d('2026-05-26') }]);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('diary');
  });

  it('returns empty array when both inputs are empty', () => {
    expect(mergeTimeline([], [])).toEqual([]);
  });
});
