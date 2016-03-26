/*
* @Author: adebray
* @Date:   2016-03-25 16:00:52
* @Last Modified by:   adebray
* @Last Modified time: 2016-03-26 15:58:18
*/

var S = require('./solver.js')
var M = require('./middleware.js')

console.log(M.host)
console.log(S.host)
var fn = S.Or(M.host, S.host)

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
