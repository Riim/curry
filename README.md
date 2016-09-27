# curry

Fast `curry` implementation with placeholders and [function-bind-syntax](https://github.com/zenparsing/es-function-bind) support.

[![Build Status](https://travis-ci.org/Riim/curry.svg?branch=master)](https://travis-ci.org/Riim/curry)
[![Coverage Status](https://coveralls.io/repos/github/Riim/curry/badge.svg?branch=master)](https://coveralls.io/github/Riim/curry?branch=master)
[![Dependency Status](https://david-dm.org/Riim/curry/status.svg)](https://david-dm.org/Riim/curry#info=dependencies)
[![Dev Dependency Status](https://david-dm.org/Riim/curry/dev-status.svg)](https://david-dm.org/Riim/curry#info=devDependencies)

## Installation

```
npm install @riim/curry --save
```

## Usage

### Basic

```js
var curry = require('@riim/curry');

var sum = curry(function(a, b) { return a + b; });
var addOne = sum(1); // or sum(curry.__, 1)

console.log(addOne(2));
// => 3
```

### Placeholders

```js
var curry = require('@riim/curry');

var setProperty = curry(function(obj, name, value) {
	obj[name] = value;
	return obj;
});

var setUserAge = setProperty(curry.__, 'age');

console.log(setUserAge({}, 30));
// => { age: 30 }
```

### ES.Next syntax

```js
import { curry, __ } from '@riim/curry';

let setProperty = curry((obj, name, value) => {
	obj[name] = value;
	return obj;
});

let setUserAge = setProperty(__, 'age');

console.log(setUserAge({}, 30));
// => { age: 30 }
```

### Function bind syntax

```js
import { curry, __ } from '@riim/curry';

let setProperty = ((obj, name, value) => {
	obj[name] = value;
	return obj;
})::curry();

let setUserAge = setProperty(__, 'age');

console.log(setUserAge({}, 30));
// => { age: 30 }
```

## Benchmark

Create - `sum = curry((a, b) => a + b)` - least important result
Lift - `addOne = sum(1)`
Call - `addOne(2)` - much more important result than the previous two

Results in K ops/sec.

| Library                                                              | Create | Lift  | Call  |
|----------------------------------------------------------------------|--------|-------|-------|
| @riim/curry                                                          |  2,450 | 5,500 | 6,600 |
| [curry](https://www.npmjs.com/package/curry)                         | 13,500 |   400 |   350 |
| [cast-curry](https://www.npmjs.com/package/cast-curry)               |  4,550 |   165 |   350 |
| [just-curry](https://www.npmjs.com/package/just-curry)               |    900 |   200 |   195 |
| [auto-curry](https://www.npmjs.com/package/auto-curry)               |    385 |   170 |   155 |
| [light-curry](https://www.npmjs.com/package/light-curry)             | 21,900 | 3,950 | 1,200 |
| [@thisables/curry](https://www.npmjs.com/package/@thisables/curry)   |    400 |   700 |   600 |
| [@ibrokethat/curry](https://www.npmjs.com/package/@ibrokethat/curry) |  6,100 |   250 | 2,050 |
| [instant-curry](https://www.npmjs.com/package/instant-curry)         |  7,100 |   250 | 1,600 |
| [fj-curry](https://www.npmjs.com/package/fj-curry)                   | 13,750 |   385 |   350 |
| [curry-d](https://www.npmjs.com/package/curry-d)                     |  9,100 |   350 |   330 |

Benchmark sources can be found in the folder [perf](https://github.com/Riim/curry/tree/master/perf).
