/*
* @Author: adebray
* @Date:   2015-06-05 15:47:33
* @Last Modified by:   adebray
* @Last Modified time: 2016-03-26 16:05:29
*/

'use strict';

var HTTP = require('http')
var S = require('./solver.js')
var M = require('./middleware.js')

var server = HTTP.createServer(
	S.Or(M.host, S.host)
)

server.listen(process.argv[2] || 80)
