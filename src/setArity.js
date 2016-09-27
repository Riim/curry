let aritySetterMap = Object.create(null);

export default function setArity(fn, arity) {
	return (aritySetterMap[arity] || (aritySetterMap[arity] = Function(
		'fn',
		`return function(${ Array(arity + 1).join(', _').slice(2) }) { return fn.apply(this, arguments); };`
	)))(fn);
}
