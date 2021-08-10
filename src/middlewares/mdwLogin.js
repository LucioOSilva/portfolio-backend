const loginService = require('../services/LoginServices');
const status = require('../services/statusCode');

const handshake = (_req, res, _next) => {
  return res.status(status.OK).json({ message: 'Im awake!'});
}

const noLoginValidator = (req, _res, next) => {
  try {
    const { IPv4, latitude, longitude } = req.body;
    const data = loginService.nologinVerifier(IPv4, latitude, longitude)
    if (data.message) throw data;
    next();
  } catch (error) {
    return next(error);
  }
}

const noLoginTokenResponse = (req, res, next) => {
  try {
    const {IPv4, latitude, longitude, country_name } = req.body;
    const objectUser = {
      IPv4,
      latitude,
      longitude,
      countryName: country_name };
    const token = loginService.tokenGenerator(objectUser);
    return res.status(status.accepted).json(token);
  } catch (error) {
    return next(error);
  }
}

const loginAuthenticator = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    const data = loginService.tokenValidator(authorization);
    if (data.message) throw data;
    req.body.noLogin = { ...data };
    return next();
  } catch (error) {
    return next(error);
  }
}


module.exports = {
  handshake,
  noLoginValidator,
  noLoginTokenResponse,
  loginAuthenticator,
};
