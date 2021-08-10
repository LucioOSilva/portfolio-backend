const express = require('express');
const mdw = require('../middlewares');

const loginRouter = express.Router();

loginRouter.post('/nologin', mdw.mdwLogin.noLoginValidator, mdw.mdwLogin.noLoginTokenResponse);

module.exports = loginRouter;
