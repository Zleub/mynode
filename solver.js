var And = function (table, solver) {
	return function (req, res) {
		return Object.keys(table).every( function (key) {
			return solver(req, res, key, table[key])
		})
	}
}

var Or = function (table, solver) {
	return function (req, res) {
		return !Object.keys(table).every( function (key) {
			return !solver(req, res, key, table[key])
		})
	}
}

var host = function (req, res, key, value) {
	if (!req.headers.host)
		return false

	if ( req.headers.host.match(key) ) {
		return value(req,res)
	}
}

var url = function (req, res, key, value) {
	if (!req.url)
		return false

	if ( req.url.match(key) ) {
		return value(req,res)
	}

}

var solve = function (req, res, key, value) {
	return value(req, res)
}

exports.And = And
exports.Or = Or

exports.solve = solve
exports.host = host
exports.url = url
