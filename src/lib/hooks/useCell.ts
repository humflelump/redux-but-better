import React from "react";

export function useCell<ReturnType>(func: () => ReturnType): ReturnType {
  const [state] = React.useState({ count: 0, result: null as any });
  if (state.count === 0) {
    state.result = func();
  }
  state.count += 1;
  return state.result as ReturnType;
}
