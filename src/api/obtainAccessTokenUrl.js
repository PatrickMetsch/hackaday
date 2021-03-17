const { clientId } = require("./clientId")
const { clientSecret } = require("./clientSecret")

const obtainAccessTokenUrl = code => `https://hackaday.io/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`;

module.exports.obtainAccessTokenUrl = obtainAccessTokenUrl;