const fetch = require('node-fetch');
const { jsonGetOptions } = require("../../api/jsonGetOptions")
const { unauthorizedRoute } = require("../auth/unauthorizedRoute");
const { projectDetailByIdUrl } = require("../../api/projectDetailByIdUrl")
const { searchProjects } = require("../../api/searchProjects")
const { userByIdUrl } = require("../../api/userByIdUrl");

async function projectDetailsRouteHandler(req, res){
	if(!req.session.access_token){
		res.redirect(unauthorizedRoute);
	}
	else {
		const projectId = req.params.id;
		const {owner_id, tags, ...rest} = await fetch(projectDetailByIdUrl(projectId), jsonGetOptions).then(response => response.json())
		const owner = await fetch(userByIdUrl(owner_id), jsonGetOptions).then(response => response.json())
		const {projects:relatedProjects } = await fetch(searchProjects(tags[0]), jsonGetOptions).then(response => response.json())

		res.render(
			"projectDetails.ejs", 
			{ 
			project: {owner_id, tags, ...rest},
			owner,
			relatedProjects
			}
		)
	}
}

module.exports.projectDetailsRouteHandler = projectDetailsRouteHandler