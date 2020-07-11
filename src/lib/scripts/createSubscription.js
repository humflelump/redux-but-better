var ar = len => {
  var L = [];
  for (let i = 1; i < len + 1; i++) {
    L.push(i);
  }
  return L;
};

// prettier-ignore
function genType(inputs) {
        return `
export function createSubscription<ReturnType${inputs > 0 ? ', ' : ''}${ar(inputs).map(i => `R${i}`).join(', ')}>(params: {
    id?: string;
    data: ReturnType;
    inputs${inputs > 0 ? '' : '?'}: [${ar(inputs).map(i => `AtomOrSelector<R${i}>`).join(', ')}];
    onInputsChanged?: (
        current: [${ar(inputs).map(i => `R${i}`).join(', ')}],
        prev: [${ar(inputs).map(i => `R${i}`).join(', ')}] | null,
        setter: (val: ReturnType) => void
    ) => void;
    onSubscriptionsChanged?: (
        newListeners: Listener[],
        prevListeners: Listener[],
        setter: (val: ReturnType) => void
    ) => void;
    onSubscribe?: (values: [${ar(inputs).map(i => `R${i}`).join(', ')}], setter: (val: ReturnType) => void) => void;
    onUnsubscribe?: (values: [${ar(inputs).map(i => `R${i}`).join(', ')}], setter: (val: ReturnType) => void) => void;
    }): [Selector<ReturnType>, (val: ReturnType) => void];
    `
    }

var res = ar(7).map((d, i) => genType(i)).join(`
  `);
console.log(res);
