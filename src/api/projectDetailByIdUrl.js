const { apiKey } = require("./apiKey");

const projectDetailByIdUrl = 
	(projectId) =>
		`http://api.hackaday.io/v1/projects/${projectId}?api_key=${apiKey}`

module.exports.projectDetailByIdUrl = projectDetailByIdUrl