import { Atomify } from "./types";
import { Atom } from "../core/Atom";
import { mapValues } from "../helpers/map-values";

export function createMolecule<Slice, Metadata = { slice: string }>(params: {
  slice: Slice;
  key: string;
  metadata?: Metadata;
}): Atomify<Slice, Metadata>;

export function createMolecule(params: any) {
  const { key, slice } = params;
  return mapValues(slice, (val, k) => {
    const metadata = "metadata" in params ? params.metadata : { slice: key };
    return new Atom({
      data: val,
      id: `${key}.${k}`,
      metadata
    });
  });
}
