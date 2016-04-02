var URL = require('url')
var FS = require('fs')

var post = JSON.parse(process.argv[2])
// console.warn(JSON.stringify(post.db))

if (!post)
	return console.log('')

var path = URL.parse(post.url).path
var str = JSON.stringify(post.db)

try {
	// console.warn(str)
	FS.writeFileSync('.' + path, str)
	return console.log('true')
}
catch (e) {
	console.warn('store.js error')
	return console.log('false')
}

