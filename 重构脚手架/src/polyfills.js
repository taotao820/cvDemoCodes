require('es6-promise').polyfill();
require('fetch-ie8');

if(!Object.assign){
	Object.assign = require('object-assign');
}