// Require babel hook included to load all subsequent files required by
// gulp with the extensions .es6, .es, .jsx, .js and transpile them
// with babel. This will also automatically require the polyfill.
require("babel-register");
// ```
// gulpfile.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// gulpfile.js may be freely distributed under the MIT license
// ```

// *gulpfile.js*

// Load gulp configuration
var conf = require('./gulpfile.conf.js');