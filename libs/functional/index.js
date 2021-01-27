'use strict'

module.exports.valueOr = (source, fallback) => source || fallback

module.exports.any = (...fn) => x => fn.some(f => f(x))

module.exports.all = (...fn) => x => fn.every(f => f(x))

module.exports.def = x => !!x

module.exports.pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))

module.exports.compose = (...fns) => fns.reduceRight((f, g) => (...args) => g(f(...args)))

module.exports.maybe = x =>
({
	isPresent: () => !!x,
	map: fn => exports.maybe(fn(x)),
	value: () => x,
	valueOrDefault: def => exports.valueOr(x, def)
})

module.exports.curry = (fn, ...args) =>
	fn.length === args.length
		? fn(...args)
		: (...more) => exports.curry(fn, ...args, ...more)

module.exports.tap = exports.peek = fn => x => {
	fn(x)
	return x
}

module.exports.flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? exports.flatten(b) : b), [])

module.exports.not = fn => x => !fn(x)

module.exports.take = exports.check = x =>
({
	on: (pred, fn) => (pred(x) ? checked(fn(x)) : exports.take(x)),
	otherwise: fn => fn(x),
	map: fn => exports.take(fn(x)),
	fold: () => x
})

const checked = x => (
	{
		on: () => checked(x),
		otherwise: () => x,
		map: () => checked(x),
		fold: () => x
	})
