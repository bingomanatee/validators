This is an attempt to make a shareable library to validate fundamental types with as 
little code as possible. 

the module is a function that returns a function that returns a test, by name. 
The nature of the tests is that if the candidate passes the test false 
is returned; if not, a string is returned describing the error. 

This means, "false is good, string is fail".

```javascript
import validators from '@wonderlandlabs/validators';
const val = validators();
const isString = val('string');

console.log(isString('foo')); 
// false

console.log(isString(1));
// 'must be string';

```

Current tests include:

* `string`
* `number`
* `integer`
* `array`
* `object`
* `map` (Map class)
* `set` (Set class)
* `boolean` (true or false)
* `date` (Date class)
* `function`
* `null`
* `undefined`
* `true` (truthy)
* `false` (falsy)

## is

If you want true to be returned when an item is valid, call "is". Is 
returns true for good data, false for bad; therefore, never returns string. 

```javascript
import validators from '@wonderlandlabs/validators';
const val = validators();
const isString = val.is('string');

console.log(isString('foo')); 
// true

console.log(isString(1));
// false

```
## Expanding validators

validators uses a closured set of tests; you can expand the 
tests by passing a function into validators:

```javascript
import validators from '@wonderlandlabs/validators';
const val = validators();
const digits = [0,1,2,3,4,5,6,7,8,9];
function isDigit(value) {
  return digits.includes(value) ? false : 'must be 0-9'
}

val('digit', isDigit);

console.log(val('digit')(2)); 
// false
console.log(val('digit')(20)); 
// 'must be 0-9'

```

Your custom tests are only available from the instance function you 
use to define the test. This is intentional, to prevent singleton issues. 
