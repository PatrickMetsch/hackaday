const fetch = require('node-fetch');
const { jsonGetOptions } = require("../../api/jsonGetOptions")
const { unauthorizedRoute } = require("../auth/unauthorizedRoute");
const { allProjectsSortedByDate } = require("../../api/allProjectsRequestUrl")
const { truncatedStringsList } = require("../../utils/arrays/truncatedStringsList")

async function projectsListRouteHandler(req, res){
	if(!req.session.access_token){
		res.redirect(unauthorizedRoute);
	  }
	  else {
		const page = req.params.page || 1;
	
		const response = await fetch(allProjectsSortedByDate(page)(10), jsonGetOptions).then(response => response.json())
	
		const { projects, last_page } = response
	
		const truncatedDescriptions = 
		  truncatedStringsList(projects.map(a => a.description || "No Description Available"))(120)
	
		res.render(
		  "projects.ejs", 
		  { 
			projects, 
			truncatedDescriptions,
			page: parseInt(page),
			lastPage: parseInt(last_page)
		  }
		)
	  }
}

module.exports.projectsListRouteHandler = projectsListRouteHandler