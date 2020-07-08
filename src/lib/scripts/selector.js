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
  // prettier-ignore
  public constructor(params: {
    id?: string;
    inputs${inputs.length > 0 ? '' : '?'}: [${ar(inputs).map(i => `AtomOrSelector<R${i}>`).join(', ')}];
    func: (${ar(inputs).map(i => `val${i}: R${i}`).join(', ')}) => ReturnType;
    listenersChanged?: ListenerListener;
  });
    `
    }

var res = ar(10)
  .map((d, i) => genType(i))
  .join(``);
console.log(
  ar(10)
    .map(i => `R${i} = any`)
    .join(", ")
);
console.log(res);
