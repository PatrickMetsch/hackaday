const { apiKey } = require("./apiKey")

const allProjectsRequestUrl =
	(sortBy) =>
	(pageNumber) =>
	(projectsPerPage) =>
		`http://api.hackaday.io/v1/projects?api_key=${apiKey}&page=${pageNumber}&per_page=${projectsPerPage}&sortby=${sortBy}`

const allProjectsSortedByDate = allProjectsRequestUrl("newest");

module.exports.allProjectsSortedByDate = allProjectsSortedByDate;