
Solver = require('./solver.js')
Mods = require('./mods.js')

// var filesystem = {

// }

var url = {
	'^/$' : Solver.And([
		function (req, res) { req.url = '/app/index.html'; return true },
		Solver.Or([
			Mods.serve,
			Mods.error
			], Solver.solve),
	], Solver.solve),
	'^/scripts/.+' : Solver.And([
		Mods.exec,
		Mods.error
	], Solver.solve),
	'^/.+' : Solver.And([
		Mods.serve,
		Mods.error
	], Solver.solve)
}

var host = {
	'priv\.adebray\.ovh' : Solver.And([
		Mods.auth,
		Solver.Or(url, Solver.url),
	], Solver.solve),
	'.+' : Mods.error,
}

// exports.filesystem = filesystem
// exports.url = url
exports.host = host
