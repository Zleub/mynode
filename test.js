/*
* @Author: adebray
* @Date:   2016-03-25 16:00:52
* @Last Modified by:   adebray
* @Last Modified time: 2016-03-25 17:10:09
*/

var S = require('./solver.js')
var M = require('./middleware.js')

// var fn = S.solve(M.host, S.host)
var fn = S.And(M.host, function (req, res, table, key) {
	console.log('anonymous call', table, key)
})

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
]

tests.map(function (e) {
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
