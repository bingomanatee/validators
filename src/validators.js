const A = Symbol('absent')
const isType = (s) => (v) => typeof v === s ? false : 'must be ' + s;
const isO = isType('object');
const isA = (cl, name) => (v) => v instanceof cl ? false : 'must be ' + name;
const int = (v) => ((Number.isSafeInteger(v)) ? false : 'must be integer');

const e = (name) => {
  throw new Error('no validator named ' + name)
};
export default () => {
  const tests = new Map();
  const is = (test) => {
    if (!tests.has(test)) {
      e(test);
    }
    return (v) => !tests.get(test)(v);
  };

  const validators = (name) => {
    if (!tests.has(name)) {
      e(name);
    }
    return tests.get(name);
  };

  validators.is = is
  validators.has = (n) => tests.has(n);
  validators.define = (n, test) => tests.set(n, test);

  validators.define('string', isType('string'));
  validators.define('number', isType('number'));
  validators.define('integer', int);
  validators.define('int', int);
  validators.define('array', (v) => (Array.isArray(v) ? false : 'must be array'));
  validators.define('object', (v) => v ? isO(v) : 'must be object');
  validators.define('map', isA(Map, 'Map'));
  validators.define('set', isA(Set, 'Set'));
  validators.define('boolean', (v) => ((v === true) || (v === false)) ? false : 'must be boolean');
  validators.define('date', isA(Date, 'Date'));
  validators.define('function', isType('function'));
  validators.define('null', (v) => v === null ? false : 'must be null');
  validators.define('undefined', isType('undefined'));
  validators.define('true', ((v) => !!v ? false : 'must be true'));
  validators.define('false', ((v) => !v ? false : 'must be falsy'));
  return validators;
}
