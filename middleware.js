
Solver = require('./solver.js')
Mods = require('./mods.js')

var filesystem = {

}

var url = {
	'^/$' : [
		'/app/index.html',
		Mods.serve
	],
	'^/scripts/.+' : [
		Mods.exec
	],
	'^/.+' : [
		Mods.serve,
		// Mods.error
	],
}

var host = {
	'priv\.adebray\.ovh' : [
		Mods.auth,
		function () {console.log('solve url -> serve')} //Solver.solve(url, Solver.url)
	],
	'.+' : [
		function () {console.log('solve url -> serve')} //Solver.solve(url, Solver.url)
	]
}

exports.filesystem = filesystem
exports.url = url
exports.host = host
