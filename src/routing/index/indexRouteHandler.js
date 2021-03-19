const { unauthorizedRoute } = require("../auth/unauthorizedRoute");

function indexRouteHandler(req, res){
	if(!req.session.access_token){
		res.redirect(unauthorizedRoute);
	}
	else {
		res.redirect("/projects/page/1")
	}
}

module.exports.indexRouteHandler = indexRouteHandler