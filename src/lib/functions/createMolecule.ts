import { Atomify } from "./types";
import { mapValues } from "../helpers/map-values";
import { atom } from "../core/atom";

export function createMolecule<Slice, Metadata = null>(params: {
  slice: Slice;
  key: string;
  getMetadata?: (val: any, key: string) => Metadata;
}): Atomify<Slice, Metadata>;

export function createMolecule(params: any) {
  const { key, slice, getMetadata } = params;
  return mapValues(slice, (val, k) => {
    const metadata = getMetadata ? getMetadata(val, k) : null;
    return atom({
      data: val,
      id: `${key}.${k}`,
      metadata
    });
  });
}
