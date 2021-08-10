const express = require('express');
const mdw = require('../middlewares');

const emailRouter = express.Router();

emailRouter.get('/', mdw.mdwLogin.loginAuthenticator, mdw.mdwEmail.getAllEmails );
emailRouter.post('/',
  mdw.mdwLogin.loginAuthenticator,
  mdw.mdwEmail.verifyEmail,
  mdw.mdwEmail.verifyEmailExists,
  mdw.mdwEmail.postEmail);

module.exports = emailRouter;
