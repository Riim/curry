var Benchmark = require('benchmark');

var riimCurry = require('../dist/curry');
var dominictarrCurry = require('curry');
var castCurry = require('cast-curry');
var justCurry = require('just-curry');
var autoCurry = require('auto-curry');
var lightCurry = require('light-curry');
var thisablesCurry = require('@thisables/curry').curry;
var ibrokethatCurry = require('@ibrokethat/curry');
var instantCurry = require('instant-curry');
var fjCurry = require('fj-curry').curry;
var curryD = require('curry-d').curry;

var suite = new Benchmark.Suite();

var sum;
var addOne;
var res;

suite
	.add('riimCurry.create', function() {
		sum = riimCurry(function(a, b) { return a + b; });
	})
	.add('riimCurry.lift', function() {
		addOne = sum(1);
	})
	.add('riimCurry.call', function() {
		res = addOne(2);
	})

	.add('dominictarrCurry.create', function() {
		sum = dominictarrCurry(function(a, b) { return a + b; });
	})
	.add('dominictarrCurry.lift', function() {
		addOne = sum(1);
	})
	.add('dominictarrCurry.call', function() {
		res = addOne(2);
	})

	.add('castCurry.create', function() {
		sum = castCurry(function(a, b) { return a + b; });
	})
	.add('castCurry.lift', function() {
		addOne = sum(1);
	})
	.add('castCurry.call', function() {
		res = addOne(2);
	})

	.add('justCurry.create', function() {
		sum = justCurry(function(a, b) { return a + b; });
	})
	.add('justCurry.lift', function() {
		addOne = sum(1);
	})
	.add('justCurry.call', function() {
		res = addOne(2);
	})

	.add('autoCurry.create', function() {
		sum = autoCurry(function(a, b) { return a + b; });
	})
	.add('autoCurry.lift', function() {
		addOne = sum(1);
	})
	.add('autoCurry.call', function() {
		res = addOne(2);
	})

	.add('lightCurry.create', function() {
		sum = lightCurry(function(a, b) { return a + b; });
	})
	.add('lightCurry.lift', function() {
		addOne = sum(1);
	})
	.add('lightCurry.call', function() {
		res = addOne(2);
	})

	.add('thisablesCurry.create', function() {
		sum = thisablesCurry.call(function(a, b) { return a + b; });
	})
	.add('thisablesCurry.lift', function() {
		addOne = sum(1);
	})
	.add('thisablesCurry.call', function() {
		res = addOne(2);
	})

	.add('ibrokethatCurry.create', function() {
		sum = ibrokethatCurry(function(a, b) { return a + b; });
	})
	.add('ibrokethatCurry.lift', function() {
		addOne = sum(1);
	})
	.add('ibrokethatCurry.call', function() {
		res = addOne(2);
	})

	.add('instantCurry.create', function() {
		sum = instantCurry(function(a, b) { return a + b; });
	})
	.add('instantCurry.lift', function() {
		addOne = sum(1);
	})
	.add('instantCurry.call', function() {
		res = addOne(2);
	})

	.add('fjCurry.create', function() {
		sum = fjCurry(function(a, b) { return a + b; });
	})
	.add('fjCurry.lift', function() {
		addOne = sum(1);
	})
	.add('fjCurry.call', function() {
		res = addOne(2);
	})

	.add('curryD.create', function() {
		sum = curryD(function(a, b) { return a + b; });
	})
	.add('curryD.lift', function() {
		addOne = sum(1);
	})
	.add('curryD.call', function() {
		res = addOne(2);
	})

	.on('cycle', function(evt) {
		console.log(String(evt.target));
	})
	.run({ 'async': true });
