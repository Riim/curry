(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.curry = factory());
}(this, (function () { 'use strict';

var aritySetterMap = Object.create(null);

function setArity(fn, arity) {
	return (aritySetterMap[arity] || (aritySetterMap[arity] = Function('fn', 'return function(' + Array(arity + 1).join(', _').slice(2) + ') { return fn.apply(this, arguments); };')))(fn);
}

/**
 * https://yadi.sk/i/vwT-J9KEvoA54
 */
function Placeholder() {}
var placeholder = new Placeholder();

function mergeArguments(args, moreArgs) {
	var i = 0;
	var j = 0;
	var len = args.length;
	var moreLen = moreArgs.length;

	var mergedArgs = Array(len);
	var placeholderCount = 0;

	for (; i < len; i++) {
		var arg = args[i];

		if (arg === placeholder) {
			if (j < moreLen && moreArgs[j++] !== placeholder) {
				mergedArgs[i] = moreArgs[j - 1];
				continue;
			} else {
				placeholderCount++;
			}
		}

		mergedArgs[i] = arg;
	}

	for (; j < moreLen; j++) {
		if ((mergedArgs[i++] = moreArgs[j]) === placeholder) {
			placeholderCount++;
		}
	}

	return { arguments: mergedArgs, placeholderCount: placeholderCount };
}

function curry() {
	for (var _len = arguments.length, initialArgs = Array(_len), _key = 0; _key < _len; _key++) {
		initialArgs[_key] = arguments[_key];
	}

	var fn = typeof this == 'function' ? this : initialArgs.shift();

	function currify(args, arity) {
		function curried() {
			for (var _len2 = arguments.length, newArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				newArgs[_key2] = arguments[_key2];
			}

			var mergedArgs = mergeArguments(args, newArgs);

			return mergedArgs.placeholderCount ? currify(mergedArgs.arguments, mergedArgs.placeholderCount) : fn.apply(void 0, mergedArgs.arguments);
		}

		return arity !== void 0 ? setArity(curried, arity) : curried;
	}

	var fnLen = fn.length;

	for (var i = initialArgs.length; i < fnLen; i++) {
		initialArgs[i] = placeholder;
	}

	return currify(initialArgs)();
}

curry.placeholder = curry.__ = curry._ = placeholder;
curry.curry = curry;

return curry;

})));
