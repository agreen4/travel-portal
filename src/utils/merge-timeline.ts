export function mergeTimeline<
  P extends { date: Date },
  D extends { date: Date }
>(
  planItems: P[],
  diaryItems: D[]
): Array<({ type: 'plan' } & P) | ({ type: 'diary' } & D)> {
  return [
    ...planItems.map(p => ({ type: 'plan' as const, ...p })),
    ...diaryItems.map(d => ({ type: 'diary' as const, ...d })),
  ].sort((a, b) => {
    const diff = a.date.getTime() - b.date.getTime();
    if (diff !== 0) return diff;
    return a.type === 'plan' ? -1 : 1;
  });
}
