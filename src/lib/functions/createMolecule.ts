import { Atomify } from "./types";
import { Atom } from "../node/Atom";

export function createMolecule<Slice>(params: {
  slice: Slice;
  key: string;
}): Atomify<Slice>;

export function createMolecule(params: any) {
  const { key, slice } = params;
  const result = {} as any;
  for (const objkey in slice) {
    const atomKey = `${key}.${objkey}`;
    result[objkey] = new Atom({
      data: slice[objkey],
      id: atomKey
    });
  }
  return result;
}
