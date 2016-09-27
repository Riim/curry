import setArity from './setArity';
import mergeArguments from './mergeArguments';
import placeholder from './placeholder';

export default function curry(/*fn, */...initialArgs) {
	let fn = typeof this == 'function' ? this : initialArgs.shift();

	function currify(args, arity) {
		function curried(...newArgs) {
			let mergedArgs = mergeArguments(args, newArgs);

			return mergedArgs.placeholderCount ?
				currify(mergedArgs.arguments, mergedArgs.placeholderCount) :
				fn.apply(void 0, mergedArgs.arguments);
		}

		return arity !== void 0 ? setArity(curried, arity) : curried;
	}

	let fnLen = fn.length;

	for (let i = initialArgs.length; i < fnLen; i++) {
		initialArgs[i] = placeholder;
	}

	return currify(initialArgs)();
}

curry.placeholder = curry.__ = curry._ = placeholder;
curry.curry = curry;
