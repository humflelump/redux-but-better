import { atom, Atomify } from "./atom";

export function createMolecule<Slice>(params: {
  slice: Slice;
  key: string;
}): Atomify<Slice>;

export function createMolecule(params: any) {
  const { key, slice } = params;
  const result = {} as any;
  for (const objkey in slice) {
    const atomKey = `${key}.${objkey}`;
    result[objkey] = atom({
      data: slice[objkey],
      id: atomKey
    });
  }
  return result;
}
