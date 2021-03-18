const { truncated } = require("../strings/truncated")

const truncatedStringsList =
	(arrayOfStrings) =>
	(maximumCharactersPerString) =>
		arrayOfStrings.map(a => truncated(a)(maximumCharactersPerString))

module.exports.truncatedStringsList = truncatedStringsList;
