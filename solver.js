Mods = require('./mods.js')

var Solver = function (table, solver) {
	return function (req, res) {

		// console.log('---------------------------')
		// console.log(table)
		Object.keys(table).every( function (key) {
			// console.log(key)
			if (solver(req, res, key)) {
				return false
			}
			else {
				return true
			}
		})
	}
}

var urlMiddleware = {
	'^/$' : [
		'/app/index.html',
		Mods.serve
	],
	'^/scripts/.+' : [
		Mods.exec
	],
	'^/.+' : [
		Mods.serve
	],
}

var urlSolver = function (req, res, key) {
	// console.log(key + ' route')

	if (req.url.match(key)) {
		urlMiddleware[key].every( function (elem) {
			if (typeof(elem) == 'string') {
				req.url = elem
				return true
			}
			else if (typeof(elem) == 'function') {
				if (elem(req, res)) {
					return false
				}
				else {
					return true
				}
			}
		})

		return true
	}
}

var hostMiddleware = {
	'priv\.adebray\.ovh' : [
		Mods.auth,
		Solver(urlMiddleware, urlSolver)
	],
	'.+' : [
		Solver(urlMiddleware, urlSolver)
	]
}

var hostSolver = function (req, res, key) {
	// console.log('hostSolver: ', key)
	if (!req.headers.host)
		return true

	if ( req.headers.host.match(key) ) {
		hostMiddleware[key].every( function (elem) {
			if (elem(req, res)) {
				return false
			}
			else {
				return true
			}
		})
	}
}


exports.Solver = Solver
exports.hostMiddleware = hostMiddleware
exports.hostSolver = hostSolver
exports.urlMiddleware = urlMiddleware
exports.urlSolver = urlSolver
