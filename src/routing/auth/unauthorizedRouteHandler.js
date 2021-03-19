const { authorizationUrl } = require("../../api/authorizationUrl")

function unauthorizedRouteHandler(req, res){
	res.render("unauthorized.ejs", { authorizationUrl })
}

module.exports.unauthorizedRouteHandler = unauthorizedRouteHandler