'use strict';
var globby = require('globby');
console.log(globby.sync(['./docs/**/*']));