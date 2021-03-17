const { clientId } = require("./clientId");

const authorizationUrl = `https://hackaday.io/authorize?client_id=${clientId}&response_type=code`

module.exports.authorizationUrl = authorizationUrl;