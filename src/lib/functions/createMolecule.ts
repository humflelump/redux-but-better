import { Atomify } from "./types";
import { Atom } from "../node/Atom";
import { mapValues } from "../helpers/map-values";

export function createMolecule<Slice>(params: {
  slice: Slice;
  key: string;
}): Atomify<Slice>;

export function createMolecule(params: any) {
  const { key, slice } = params;
  return mapValues(slice, (val, k) => {
    return new Atom({
      data: val,
      id: `${key}.${k}`
    });
  });
}
