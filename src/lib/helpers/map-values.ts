export function mapValues(o: Object, f: Function): Object {
  const d = {};
  for (const k in o) {
    d[k] = f(o[k], k);
  }
  return d;
}
