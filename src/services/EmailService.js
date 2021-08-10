// emailService
require('dotenv/config');
const allValidators = require('./allValidatorServices');
const statusCode = require('./statusCode');
const emailModel = require('../models/EmailModel');


const objectError = (status, message) => {
  return { status, message };
};

function validateEmail(emailObject) {
  const { name, email, subject, message } = emailObject;
  if (!allValidators.fieldIsValid(name))
    return objectError(statusCode.badRequest,'Name is required and must have at least 3 characters');
  if (!allValidators.emailIsValid(email))
    return objectError(statusCode.badRequest,'email must be a valid email');
  if (!allValidators.fieldIsValid(subject))
    return objectError(statusCode.badRequest,'Subject is required');
  if (!allValidators.fieldIsValid(message))
    return objectError(statusCode.badRequest,'Message is required and must have at least 3 characters');
  return {}
}

async function verifyEmailExists(email) {
  const data = await emailModel.findOneEmail({email});
  if (!data) return {};
  const difference = new Date(Date.now()).getHours() - data.postedAt.getHours();
  if (difference < 23) return objectError(statusCode.conflict, 'You already send me an email today! thank you! =)');
  return {};
}

async function postEmail(emailObject) {
  const data = await emailModel.addEmail(emailObject);
  if (!data.insertedId) return objectError(statusCode.unprocessableEntity, 'Algo deu errado ao gravar seu email');
  return { emailId: data.insertedId };
}

async function getAllEmails() {
  const data = await emailModel.findAllEmails();
  return data;
}

module.exports = {
  validateEmail,
  verifyEmailExists,
  postEmail,
  getAllEmails,
}

