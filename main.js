/*
* @Author: adebray
* @Date:   2015-06-05 15:47:33
* @Last Modified by:   adebray
* @Last Modified time: 2016-03-27 16:20:39
*/

'use strict';

var HTTP = require('http')
var S = require('./solver.js')
var M = require('./middleware.js')

var serve = S.Or(M.host, S.host)

var server = HTTP.createServer(
	function (req, res) {
		var body = []

		req.on('data', function(chunk) {
			body.push(chunk)
		}).on('end', function() {
			req.body = Buffer.concat(body).toString()
			serve(req, res)
 		})

	}
)

server.listen(process.argv[2] || 80)
