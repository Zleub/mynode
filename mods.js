var URL = require('url')
var FS = require('fs')
var PATH = require('path')
var ChildProcess = require('child_process')
var QueryString = require('querystring')
var Path = require('path')

var error = function (req, res)
{
	// console.log('error')

	res.statusCode = 404
	res.end('My own 404')

	return true
}

var serve = function (req, res)
{
	// console.log('serve', req.url)

	try {
		FS.accessSync('.' + req.url, FS.R_OK)
		var data = FS.readFileSync('.' + req.url)

		// console.log('end')
		res.end(data)
	}
	catch (e) {
		console.log('serve error: ', e)
		return false
	}

	return true
}

var exec = function (req, res)
{
	// console.log('exec', req.body)

	var q = querysolve(req.url)

	if (q) {
		req.url = URL.parse(req.url).pathname
		Object.keys(q).map(function (key) {
			req.url = req.url + ' ' + (key + '="' + q[key] + '"')
		})
	}

	req.body = req.body.replace(/([" ])/g, '\\\$1')
	// req.body = escape(req.body)
	// console.log(req.url, req.body)

	try {
		res.end( ChildProcess.execSync('node .' + req.url + ' ' + req.body || '') )
	} catch(e) {
		console.log('catch mod');
		return false
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

	return  QueryString.parse(URLObj.query)
}

var auth = function (req, res) {
	// console.log('auth')

	var auth = {login: 'adebray', password: 'adebray'}
	var b64auth = (req.headers.authorization || '').split(' ')[1] || ''
	var s = new Buffer(b64auth, 'base64').toString().split(':')

	if (!s[0] || !s[1] || s[0] !== auth.login || s[1] !== auth.password) {
		res.statusCode = 401;
		res.setHeader('WWW-Authenticate', 'Basic');
		res.end('Unauthorized');
		return false
	}
	else
		return true
}

exports.error = error
exports.serve = serve
exports.exec = exec
exports.queryAllowed = queryAllowed
exports.querysolve = querysolve
exports.auth = auth
