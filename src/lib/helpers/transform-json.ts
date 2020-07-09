export function findAndReplace(
  o: any,
  shouldMap: (o: object) => boolean,
  mapper: (o: object) => any
) {
  if (typeof o !== "object" || o === null) return o;
  if (Array.isArray(o)) {
    o = [...o];
    for (let i = 0; i < o.length; i++) {
      if (shouldMap(o[i])) {
        o[i] = mapper(o[i]);
      } else {
        o[i] = findAndReplace(o[i], shouldMap, mapper);
      }
    }
    return o;
  } else {
    o = { ...o };
    for (var x in o) {
      if (shouldMap(o[x])) {
        o[x] = mapper(o[x]);
      } else {
        o[x] = findAndReplace(o[x], shouldMap, mapper);
      }
    }
    return o;
  }
}
