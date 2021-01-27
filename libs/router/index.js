'use strict'

const Path = require('path')
const FileSystem = require('fs')
const { check } = require('../functional')

const routesPath = Path.resolve(__dirname, '../../resources')

module.exports.setUpRoutes = () => {
	//console.log('setuproles');
	return readDirRecursively(routesPath, (file) => {
		//console.log('file ', file);
		return file.indexOf('Routes') > -1;
	})
		//.map(x => { console.log('route ==> ', x); return x; })
		//.map((module) => Object.keys(module).map((key) => module[key]))
		//.reduce((a, b) => a.concat(b))
		.map(r => r)
}

const readDirRecursively = (root, fileFilter, acc = []) =>
	FileSystem
		.readdirSync(root)
		.map(directory => `${root}/${directory}`)
		.map(file =>
			check(file)
				.on(isDirectory, x => acc.concat(readDirRecursively(x, fileFilter, acc)))
				.on(fileFilter, x => acc.concat(require(x)))
				.otherwise(() => acc))
		.filter(notEmpty)
		.reduce((a, b) => a.concat(b), [])

const isDirectory = value =>
	check(value)
		.map(FileSystem.statSync)
		.on(stat => stat && stat.isDirectory(), () => true)
		.otherwise(() => false)

const notEmpty = arr => arr && arr.length > 0