import { minify } from 'html-minifier-terser'

// Get all HTML files from the output directory
const path = 'dist'
const glob = new Bun.Glob('**/*.html')
const files = await Array.fromAsync(glob.scan({ cwd: path }))
console.log(files)
for (const file of files) {
	let html = await Bun.file(`${path}/${file}`).text()

	// Minify the HTML
	html = await minify(html, {
		removeComments: true,
		preserveLineBreaks: true,
		collapseWhitespace: true,
		minifyJS: true,
	})
	await Bun.write(`${path}/${file}`, html)
}

console.log('finished minifying html files')
