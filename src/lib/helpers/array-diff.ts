export function arraysDiff(a1: any[], a2: null | any[]) {
  if (a1 === null || a2 === null) return true;
  const len = a1.length;
  for (let i = 0; i < len; i++) {
    if (a1[i] !== a2[i]) return true;
  }
  return false;
}
