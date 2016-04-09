var ChildProcess = require('child_process')

ChildProcess.exec('ps --no-header -Ao "%p,%U,%c,%y"', function (err, stdout, stderr) {
	var array = []

	stdout.toString().match(/(.*),(.*),(.*),(.*)\s*/g).forEach( function (elem) {
		var tmp = elem.match(/[^,]+/g)
		array.push({
			'pid': tmp[0].trim(),
			'uname': tmp[1].trim(),
			'command': tmp[2].trim(),
			'tty': tmp[3].trim(),
		})
	})
	console.log( JSON.stringify(array) )
})
