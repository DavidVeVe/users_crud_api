const boom = require("@hapi/boom");
const config = require("../config/config");

function checkApiKey(req, res, next) {
  const apiKey = req.headers["api"];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized("Please provide a valid api key"));
  }
}

module.exports = { checkApiKey };
