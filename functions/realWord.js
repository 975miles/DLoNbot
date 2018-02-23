var requireDir = require('require-dir');
var functions = requireDir("../", {recurse: true});
var bal = require("../bal.json");

module.exports = function (language, checking) {
	if (!(functions.realLanguage(language))) {
		return false;
	}
	if (bal.translation[functions.getLangOwner(language)].words[checking] != undefined) {
		return true;
	}
	return false;
}