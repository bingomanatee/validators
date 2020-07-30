/* eslint-disable camelcase */
const tap = require('tap');
const p = require('./../package.json');

const validators = require('./../lib/index');

tap.test(p.name, (suite) => {
  suite.test('validators', (v) => {

    v.test('string', (s) => {
      const val = validators();
      const testString = val('string');
      s.same(testString('a string'), false);
      s.ok(testString(3));
      s.ok(testString(null));
      s.end();
    })

    v.test('number', (s) => {
      const val = validators();
      const testNum = val('number');
      s.same(testNum(3), false);
      s.ok(testNum('3'));

      s.same(testNum(3.1), false);
      s.ok(testNum('3.1'));

      s.end();
    })

    v.test('integer', (i) => {
      const val = validators();
      const testNum = val('integer');
      i.same(testNum(3), false);
      i.ok(testNum('3'));

      i.ok(testNum(null));
      i.ok(testNum(3.1));
      i.ok(testNum('3.1'));

      i.end();
    })

    v.test('array', (a) => {
      const val = validators();
      const testArray = val('array');
      a.same(testArray([]), false);
      a.same(testArray([3]), false);
      a.ok(testArray(null));

      a.end();
    })

    v.test('object', (o) => {
      const val = validators();
      const testObj = val('object');

      o.same(testObj({}), false);
      o.same(testObj({a: 1, b: 2}), false);
      o.ok(testObj(null));

      o.end();
    })

    v.test('Map', (m) => {
      const val = validators();
      const testMap = val('map');

      m.same(testMap(new Map()), false);
      m.ok(testMap({a: 1, b: 2}));
      m.ok(testMap(null));

      m.end();
    })

    v.test('function', (f) => {
      const val = validators();
      const testMap = val('function');

      f.same(testMap(() => {}), false);
      f.same(testMap(function() {

      }), false);
      f.ok(testMap({a: 1, b: 2}));
      f.ok(testMap(null));

      f.end();
    })

    v.test('boolean', (f) => {
      const val = validators();
      const testBool = val('boolean');

      f.same(testBool(true), false);
      f.same(testBool(false), false);
      f.ok(testBool(function() {
      }));
      f.ok(testBool({a: 1, b: 2}));
      f.ok(testBool(null));

      f.end();
    })

    v.end();
  });

  suite.end();
});
