import React from "react";
import { createId } from "../helpers/createId";
import { Atomify } from "../functions/types";
import { store } from "../store";
import { atom } from "../core/atom";

export function useMolecule<Slice>(obj: Slice): Atomify<Slice> {
  const [mol] = React.useState({} as any);

  React.useEffect(() => {
    return () => {
      for (const key in mol) {
        store.removeAtom(mol[key]);
      }
    };
  }, []);

  for (const key in obj) {
    if (key in mol) {
      mol[key].set(obj[key]);
    } else {
      mol[key] = atom({
        data: obj[key],
        id: createId()
      });
    }
  }

  return mol;
}
