const emailService = require('../services/EmailService');
const status = require('../services/statusCode');

const verifyEmail = (req, _res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const emailObject = { name, email, subject, message };
    const data = emailService.validateEmail(emailObject)
    if (data.message) throw data;
    return next();
  } catch (error) {
    return next(error);
  }
};

const verifyEmailExists = async (req, _res, next) => {
  try {
    const { email } = req.body;
    const data = await emailService.verifyEmailExists(email)
    if (data.message) throw data;
    return next();
  } catch (error) {
    return next(error);
  }
}

const postEmail = async (req, res, next) => {
  try {
    const { IPv4, latitude, longitude, countryName, } = req.body.noLogin;
    const { name, email, subject, message } = req.body;
    const emailObject = {
      name,
      email,
      subject,
      message,
      postedAt: new Date(Date.now()),
      postedBy: { IPv4, latitude, longitude, countryName },
    }
    const data = await emailService.postEmail(emailObject);
    if (data.message) throw data;
    return res.status(status.created).json(data);
  } catch (error) {
    return next(error);
  }
};

const getAllEmails = async (req, res, next) => {
  try {
    const data = await emailService.getAllEmails();
    if (data.message) throw data;
    return res.status(status.OK).json(data);
  } catch (error) {
    return next(error);
  }
}



module.exports = {
  verifyEmail,
  verifyEmailExists,
  postEmail,
  getAllEmails,
}