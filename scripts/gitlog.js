var FS = require('fs')
var ChildProcess = require('child_process')
// var Buffer = require('buffer')

function do_file(res, files, index) {
	var file = files[index]

	FS.stat(file, function (err, stat) {

	if (stat.isDirectory()) {
		try {
			var stdout = ChildProcess.execSync('cd ' + file + ' && git log --all --pretty=format:"{' +
				'\\"sha\\": \\"%h\\", ' +
				'\\"author\\": \\"%an\\", ' +
				'\\"author_relative\\": \\"%ar\\", ' +
				'\\"subject\\": \\"%s\\"' +
				'}, "')

			if (stat.isDirectory() && stdout != '')
				res[file] = JSON.parse( '[' + stdout.slice(0, stdout.length - 2) + ']' )

		} catch (e) {

			console.warn('catch gitlog', file)

		}
	}

	if (files[index + 1])
		do_file(res, files, index + 1)
	else {

		// console.warn(JSON.stringify(res))
		console.log( JSON.stringify(res) )
	}



	})
}

FS.readdir('.', function (err, files) {
	var res = {}
	do_file(res, files, 0)
})
