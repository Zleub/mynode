/*
* @Author: adebray
* @Date:   2016-03-25 16:00:52
* @Last Modified by:   adebray
* @Last Modified time: 2016-03-28 15:38:01
*/

var S = {} //= require('./solver.js')
var M = {} //= require('./middleware.js')

// console.log(M.host)
// console.log(S.host)

var tests = [
	{
		host: 'adebray.ovh',
		url: '/'
	},
	{
		host: 'adebray.ovh',
		url: '/scripts/gitlog.js'
	},
	{
		host: 'priv.adebray.ovh',
		url: '/'
	},
	{
		host: 'test',
		url: '/'
	}
]


M.host = {
	'priv\.adebray\.ovh' : S.Or([
		function (req, res, next) { console.log("auth") } ,
		function (req, res, next) { console.log("serve") }
	], function (req, res, a, b, c) { console.log("solve", a, b, c) }),
	'.+' : function (req, res, next) { console.log("error") },
}

S.host = function (req, res, key, next) {
	console.log('host resolution:', next)
}

var fn = S.Or(M.host, S.host)
tests.map(function (e) {
	console.log('<- - ->')
	console.log(e)
	console.log('<- - ->')
	console.log('final: ', fn(
			{
				headers: { host: e.host },
				url: e.url
			},
			{
				end: function (str) { console.log('res.end') },
				setHeader: function () {}
			}
		)
	)
})
