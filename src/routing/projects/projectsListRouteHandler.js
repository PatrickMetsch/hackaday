const fetch = require('node-fetch');
const { jsonGetOptions } = require("../../api/jsonGetOptions")
const { unauthorizedRoute } = require("../auth/unauthorizedRoute");
const { allProjectsSortedByDate } = require("../../api/allProjectsRequestUrl")
const { truncatedStringsList } = require("../../utils/arrays/truncatedStringsList");
const { apiKey } = require('../../api/apiKey');


async function projectsListRouteHandler(req, res){
	if(!req.session.access_token){
		res.redirect(unauthorizedRoute);
	}
	else {
		const page = req.params.page || 1;

		const { projects, last_page } = await fetch(allProjectsSortedByDate(page)(10), jsonGetOptions).then(response => response.json())

		const pageInt = parseInt(page)
		const lastPageInt = parseInt(last_page)

		const { projects:previousPageOfProjects } = pageInt !== 1 ? await fetch(allProjectsSortedByDate(pageInt - 1)(10), jsonGetOptions).then(response => response.json()) : []
		const { projects:nextPageOfProjects } = pageInt !== lastPageInt ? await fetch(allProjectsSortedByDate(pageInt + 1)(10), jsonGetOptions).then(response => response.json()) : []

		// req.session.nextPage = nextPageOfProjects
		// req.session.previousPage = previousPageOfProjects

		const truncatedDescriptions = 
			truncatedStringsList(projects.map(a => a.description || "No Description Available"))(120)

		res.render(
			"projects.ejs", 
			{ 
			projects, 
			truncatedDescriptions,
			page: pageInt,
			lastPage: lastPageInt,
			previousPageOfProjects,
			nextPageOfProjects,

			/* Part 1 of best attempt at loading owner data client side ---

			fetch: fetch,
			apiKey: apiKey,
			jsonGetOptions: jsonGetOptions

			----------------------------------------------------------------- */
			}
		)
	}
}

module.exports.projectsListRouteHandler = projectsListRouteHandler