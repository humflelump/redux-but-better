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
  export function createThrottledSelector<${ar(inputs).map(i => `S${i}`).join(', ')}${inputs > 0 ? ', ' : ''}ReturnType>(params: {
      id?: string;
      inputs${inputs === 0 ? '?' : ''}: [${ar(inputs).map(i => `AtomOrSelector<S${i}>`).join(', ')}];
      func: (${ar(inputs).map(i => `val${i}: S${i}`).join(', ')}) => ReturnType;
      throttle: (f: () => void) => () => void;
  }): Selector<ReturnType>;
    `
    }

var res = ar(10).map((d, i) => genType(i)).join(`
  
  `);
console.log(res);
