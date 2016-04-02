var ChildProcess = require('child_process')

ChildProcess.exec('ps --no-header -Ao "%p %U %c %y"', function (err, stdout, stderr) {
	var array = []

	stdout.toString().match(/(\S+)\s*(\S+)\s*(\S+)\s*(\S+)\s*/g).forEach( function (elem) {
		var tmp = elem.match(/\S+/g)
		array.push({
			'pid': tmp[0],
			'uname': tmp[1],
			'command': tmp[2],
			'tty': tmp[3],
		})
	})
	console.log( JSON.stringify(array) )
})
