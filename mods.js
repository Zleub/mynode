var URL = require('url')
var FS = require('fs')
var PATH = require('path')
var ChildProcess = require('child_process')
var QueryString = require('querystring')
var Path = require('path')

var error = function (req, res)
{
	res.statusCode = 404
	res.end('My own 404')
}

var serve = function (req, res)
{
	// console.log('serve', req.url)

	FS.access('.' + req.url, FS.R_OK, function (err) {
		if (!err)
			FS.readFile('.' + req.url, 'ascii', function (err, data) {
			if (!err) {
				res.end(data)
			}
		})
	})
}

var exec = function (req, res)
{
	// console.log('exec', req.url)

	var q = querysolve(req.url)

	if (q) {
		req.url = URL.parse(req.url).pathname
		Object.keys(q).map(function (key) {
			req.url = req.url + ' ' + (key + '="' + q[key] + '"')
		})
	}

	// console.log(req.url)

	try {
		res.end( ChildProcess.execSync('node .' + req.url) )
	} catch(e) {
		// console.log('catch mod', e);
	}

	return true
}

var queryAllowed = {
	size : Number,
	page : Number
}

var querysolve = function (url) {
	var URLObj = URL.parse(url)

	if (URLObj.query) {
		var queryObj = QueryString.parse(URLObj.query)

		Object.keys(queryObj).map(function (key) {
			if (!queryAllowed[key])
				delete queryObj[key]
		})
	}

	return queryObj
}

var auth = function (req, res) {
	// console.log('auth')
	var user = {};

	if (user === undefined || user['name'] !== 'ade' || user['pass'] !== 'ade') {
		res.statusCode = 401;
		res.setHeader('WWW-Authenticate', 'Basic');
		res.end('Unauthorized');
	}
}

exports.error = error
exports.serve = serve
exports.exec = exec
exports.queryAllowed = queryAllowed
exports.querysolve = querysolve
exports.auth = auth