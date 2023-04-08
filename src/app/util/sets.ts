
export function getOnly<T>(set: Set<T>): T {
  if (set.size != 1) {
    throw new Error('Expected only one element in the set.');
  }
  return Array.from(set)[0];
}
