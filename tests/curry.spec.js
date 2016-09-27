describe('curry', function() {

	let __ = curry.__;

	it('[Basic usage]', function() {
		let sum = (a, b, c) => a + b + c;

		expect(curry(sum)(1, 2, 3))
			.to.equal(6);

		expect(curry(sum)(1)(2, 3))
			.to.equal(6);

		expect(curry(sum)(1, 2)(3))
			.to.equal(6);

		expect(curry(sum)(1)(2)(3))
			.to.equal(6);
	});

	it('[Placeholders][create]', function() {
		let join = (a, b, c) => '' + a + b + c;

		expect(curry(join, __, __, 3)(1, 2))
			.to.equal('123');

		expect(curry(join, __, 2)(1, 3))
			.to.equal('123');

		expect(curry(join, __, 2, __)(1, 3))
			.to.equal('123');

		expect(curry(join, __, __, __, __)(1, 2, 3)(4))
			.to.equal('123');
	});

	it('[Placeholders][lift]', function() {
		let join = (a, b, c) => '' + a + b + c;

		expect(curry(join)(__, 2, 3)(1))
			.to.equal('123');

		expect(curry(join)(1, __, 3)(2))
			.to.equal('123');

		expect(curry(join)(1, 2, __)(3))
			.to.equal('123');

		expect(curry(join)(__, __, 3)(1, 2))
			.to.equal('123');

		expect(curry(join)(__, 2, __)(1, 3))
			.to.equal('123');

		expect(curry(join)(1, __, __)(2, 3))
			.to.equal('123');
	});

	it('[Placeholders][create] length increase', function() {
		let args = function() {
			return JSON.stringify(Array.prototype.slice.call(arguments));
		};

		expect(curry(args, __)(1))
			.to.equal('[1]');

		expect(curry(args, __, __)(1, 2))
			.to.equal('[1,2]');
	});

	it('[Placeholders][lift] length increase', function() {
		let args = function() {
			return JSON.stringify(Array.prototype.slice.call(arguments));
		};

		expect(curry(args, __)(__)(1))
			.to.equal('[1]');

		expect(curry(args, __)(__, __)(1, 2))
			.to.equal('[1,2]');

		expect(curry(args, __)(__, __)(1)(__, __)(2, 3))
			.to.equal('[1,2,3]');
	});

	it('[Placeholders] more arguments', function() {
		let args = function() {
			return JSON.stringify(Array.prototype.slice.call(arguments));
		};

		expect(curry(args, __)(1, 2))
			.to.equal('[1,2]');

		expect(curry(args, __, __)(1, 2, 3, 4))
			.to.equal('[1,2,3,4]');
	});

	it('function-bind-sintax', function() {
		let sum = (a, b, c) => a + b + c;

		expect(sum::curry()(1, 2, 3))
			.to.equal(6);

		expect(sum::curry(1)(2, 3))
			.to.equal(6);

		expect(sum::curry(1, 2)(3))
			.to.equal(6);

		expect(sum::curry(1)(2)(3))
			.to.equal(6);
	});

});
