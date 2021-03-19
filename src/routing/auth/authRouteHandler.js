const fetch = require('node-fetch')
const { jsonGetOptions } = require("../../api/jsonGetOptions")
const { obtainAccessTokenUrl } = require("../../api/obtainAccessTokenUrl")

async function authRouteHandler(req, res){
	const code = req.query.code;
	const text = await fetch(obtainAccessTokenUrl(code), jsonGetOptions).then(response => response.text())
	const accessToken = JSON.parse(text).access_token;

	req.session.access_token = `token ${accessToken}`;

	res.redirect("/projects/page/1");
}

module.exports.authRouteHandler = authRouteHandler