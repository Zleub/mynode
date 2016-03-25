// var Solver = function (table, solver) {
// 	return function (req, res) {

// 		console.log('---------------------------')
// 		// console.log(table)
// 		Object.keys(table).every( function (key) {
// 			// console.log(key)
// 			if (solver(req, res, table, key)) {
// 				console.log(key + ' -> true')
// 				return false
// 			}
// 			else {
// 				console.log(key + ' -> false')
// 				return true
// 			}
// 		})
// 	}
// }

var And = function (table, solver) {
	return function (req, res) {
		return Object.keys(table).reduce( function (prev, key) {
			return prev & solver(req, res, table, key)
		}, true)
	}
}

// var url = function (req, res, table, key) {
// 	console.log('urlSolver: ', key)

// 	if (req.url.match(key)) {
// 		table[key].every( function (elem) {
// 			if (typeof(elem) == 'string') {
// 				req.url = elem
// 				return true
// 			}
// 			else if (typeof(elem) == 'function') {
// 				if (elem(req, res)) {
// 					return false
// 				}
// 				else {
// 					return true
// 				}
// 			}
// 		})

// 		return true
// 	}
// }

// var host = function (req, res, table, key) {
// 	console.log('hostSolver: ', key)

// 	if (!req.headers.host)
// 		return true

// 	if ( req.headers.host.match(key) ) {
// 		table[key].every( function (elem) {
// 			if (elem(req, res)) {
// 				// console.log('true')
// 				return false
// 			}
// 			else {
// 				// console.log('false')
// 				return true
// 			}
// 		})
// 	}
// }

exports.And = And

// exports.solve = Solver
// exports.host = host
// exports.url = url

// exports.hostMiddleware = hostMiddleware
// exports.urlMiddleware = urlMiddleware
