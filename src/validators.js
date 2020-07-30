
const A = Symbol('absent')
const isType = (s) => (v) => typeof v === s ? false: 'must be ' + s;
const isO = isType('object');
const isA = (cl, name) => (v) => v instanceof cl ? false: 'must be ' + name;
const int = (v) => ((Number.isSafeInteger(v)) ? false : 'must be integer');

export default () => {
  const tests = new Map();
  const is = (test, val = A) => val === A ? (v) => is(test, v) : !validators(test)(val);

  const validators = (name, val, override = false) => {
    if (typeof val == 'function') {
      if ((tests.has(name) && !override) && (!(tests.get(name) === val))) {
        throw new Error(`has a ${name}`);
      } else {
        tests.set(name, val);
      }
      return validators;
    }

    if (!tests.has(name)) throw new Error('no validator named ' + name);
    return tests.get(name);
  };


  validators('string', isType('string'));
  validators('number', isType('number'));
  validators('integer', int);
  validators('int', int);
  validators('array', (v) => (Array.isArray(v) ? false : 'must be array'));
  validators('object', (v) => v ? isO(v) : 'must be object' );
  validators('map', isA(Map, 'Map'));
  validators('set', isA(Set, 'Set'));
  validators('boolean', (v) => ((v === true) || (v === false)) ? false : 'must be boolean');
  validators('date', isA(Date, 'Date'));
  validators('function', isType('function'));
  validators('null', (v) => v === null ? false : 'must be null');
  validators('undefined', isType('undefined'));
  validators('true', ((v) => !!v ? false: 'must be true'));
  validators('false', ((v) => !v ? false: 'must be falsy'));

  validators.is = is
  return validators;
}
