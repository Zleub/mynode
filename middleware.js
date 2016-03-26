
Solver = require('./solver.js')
Mods = require('./mods.js')

// var filesystem = {

// }

// var url = {
// 	'^/$' : [
// 		'/app/index.html',
// 		Mods.serve
// 	],
// 	'^/scripts/.+' : [
// 		Mods.exec
// 	],
// 	'^/.+' : [
// 		Mods.serve,
// 		// Mods.error
// 	],
// }

var host = {
	'priv\.adebray\.ovh' : Solver.And([
		Mods.isTrue,
		Mods.isTrue
	], Solver.solve),
	'test' : Solver.And([
		function () {console.log('G'); return true},
		function () {console.log('H'); return true}
	], Solver.solve),
	'.+' : Solver.Or([
		function () {console.log('A'); return false},
		function () {console.log('B'); return false}
	], Solver.solve),
	'.*' : Solver.Or([
		function () {console.log('C'); return false},
		function () {console.log('D'); return false}
	], Solver.solve),
	'.' : Solver.And([
		function () {console.log('E'); return true},
		function () {console.log('F'); return false}
	], Solver.solve),
}

exports.filesystem = filesystem
exports.url = url
exports.host = host
