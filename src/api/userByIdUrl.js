const { apiKey } = require("./apiKey");

const userByIdUrl = 
	(userID) =>
		`http://api.hackaday.io/v1/users/${userID}?api_key=${apiKey}`

module.exports.userByIdUrl = userByIdUrl