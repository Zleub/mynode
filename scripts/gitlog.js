var FS = require('fs')
var ChildProcess = require('child_process')
// var Buffer = require('buffer')

function do_file(res, files, index) {
	var file = './git/' + files[index]

	FS.stat(file, function (err, stat) {

		var git, head
		try {
			head = FS.statSync(file + '/HEAD')
		}
		catch (e) {
			try {
				git = FS.statSync(file + '/.git')
			}
			catch (e) {
			}
			// console.warn('gitlog catch', e)
		}

		if (stat.isDirectory() && (git || head)) {
			try {
				var stdout = ChildProcess.execSync('cd ' + file + ' && git log --all --pretty=format:"{' +
					'\\"sha\\": \\"%h\\", ' +
					'\\"author\\": \\"%an\\", ' +
					'\\"author_relative\\": \\"%ar\\", ' +
					'\\"subject\\": \\"%s\\"' +
					'}, "')

				if (stat.isDirectory() && stdout != '') {
					if (file == ".git")
						file = "."
					res[file] = JSON.parse( '[' + stdout.slice(0, stdout.length - 2) + ']' )
				}

			} catch (e) {

				// console.warn('catch gitlog', file)

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

FS.readdir('./git', function (err, files) {
	var res = {}
	do_file(res, files, 0)
})
