const { apiKey } = require("./apiKey")

const searchProjects =
	(searchTerm) =>
		`http://api.hackaday.io/v1/search/projects?api_key=${apiKey}&search_term=${searchTerm}&per_page=5`

module.exports.searchProjects = searchProjects