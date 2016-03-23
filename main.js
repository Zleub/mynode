/*
* @Author: adebray
* @Date:   2015-06-05 15:47:33
* @Last Modified by:   adebray
* @Last Modified time: 2016-03-23 16:12:24
*/

'use strict';

var HTTP = require('http')
var S = require('./solver.js')

var server = HTTP.createServer(
	S.Solver(S.hostMiddleware, S.hostSolver)
)

server.listen(process.argv[2] || 80)
