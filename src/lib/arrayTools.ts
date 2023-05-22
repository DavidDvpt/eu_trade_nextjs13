export function getDistinctValues(tab: string[]) {
  if (!tab) return [];

  return tab.filter((f, i, self) => i === self.indexOf(f));
}
