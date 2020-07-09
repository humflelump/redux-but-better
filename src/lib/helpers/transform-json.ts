import { Atom } from "../core/Atom";
export function findAndReplace(
  object: any,
  shouldMap: (o: object) => boolean,
  mapper: (o: object) => any
) {
  if (typeof object !== "object" || object === null) return object;
  if (Array.isArray(object)) {
    object = [...object];
    for (let i = 0; i < object.length; i++) {
      if (shouldMap(object[i])) {
        object[i] = mapper(object[i]);
      } else {
        object[i] = findAndReplace(object[i], shouldMap, mapper);
      }
    }
    return object;
  } else {
    object = { ...object };
    for (var x in object) {
      if (shouldMap(object[x])) {
        object[x] = mapper(object[x]);
      } else {
        object[x] = findAndReplace(object[x], shouldMap, mapper);
      }
    }
    return object;
  }
}

export function atomDataToJSON(obj) {
  const res = findAndReplace(
    obj,
    o => o instanceof Atom,
    (a: any) => {
      const d = a.toJSON();
      d.data = atomDataToJSON(d.data);
      return d;
    }
  );
  return res;
}
