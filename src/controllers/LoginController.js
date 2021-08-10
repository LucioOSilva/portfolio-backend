const express = require('express');
const mdw = require('../middlewares');

const loginRouter = express.Router();

loginRouter.get('/handshake', mdw.mdwLogin.handshake);
loginRouter.post('/nologin', mdw.mdwLogin.noLoginValidator, mdw.mdwLogin.noLoginTokenResponse);

module.exports = loginRouter;
