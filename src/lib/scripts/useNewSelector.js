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
    export function useNewSelector<ReturnType${inputs > 0 ? ', ': ''}${ar(inputs).map(i => `R${i}`)}>(params: {
      id?: string;
      inputs${inputs.length > 0 ? '' : '?'}: [${ar(inputs).map(i => `AtomOrSelector<R${i}>`).join(', ')}];
      func: (${ar(inputs).map(i => `val${i}: R${i}`).join(', ')}) => ReturnType;
      listenersChanged?: ListenerListener;
    }): ReturnType;
      `
      }

var res = ar(10)
  .map((d, i) => genType(i))
  .join(``);

console.log(res);
