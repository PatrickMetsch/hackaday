const truncated = 
	(stringToTruncate) =>
	(maximumCharacters) =>
		stringToTruncate.length > maximumCharacters
			? `${stringToTruncate.substring(0, maximumCharacters + 1)}...`
			: stringToTruncate

module.exports.truncated = truncated;