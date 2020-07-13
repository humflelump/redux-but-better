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
export function useValues<${ar(inputs).map(i => `R${i}`).join(', ')}${inputs > 0 ? ', ' : ''}Data = undefined>(selectors: [${ar(inputs).map(i => `AtomOrSelector<R${i}>`).join(', ')}], data?: Data): [${ar(inputs).map(i => `R${i}`).join(', ')}] 
  `
  }

var res = ar(15).map((d, i) => genType(d)).join(`
  `);
console.log(res);
