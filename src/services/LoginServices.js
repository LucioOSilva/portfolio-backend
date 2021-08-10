// loginService
require('dotenv/config');
const jwt = require('jsonwebtoken');
const allValidators = require('./allValidatorServices');
const statusCode = require('./statusCode');


const secret = process.env.JWT_SECRET || 'token';
const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };

const objectError = (status, message) => {
  return { status, message }
}

function tokenGenerator(userObjectWithoutPass) {
    const token = jwt.sign(userObjectWithoutPass, secret, jwtConfig);
    return { token };
}

function tokenValidator(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return objectError(statusCode.forbidden,'invalid token');
  }
}

function nologinVerifier(IPv4, latitude, longitude) {
  if (!allValidators.fieldIsValid(IPv4))
    return objectError(statusCode.badRequest,'The Field IP must be valid');
  if (!allValidators.fieldIsValid(latitude))
    return objectError(statusCode.badRequest,'The Field latitude must be valid');
  if (!allValidators.fieldIsValid(longitude))
    return objectError(statusCode.badRequest,'The Field longitude must be valid');
  return {};
}

module.exports = {
  tokenGenerator,
  tokenValidator,
  nologinVerifier,
};
