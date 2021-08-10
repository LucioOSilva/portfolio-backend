const express = require('express');
const router = require('../routes/router');
const mdw = require('../middlewares');

const app = express();
app.use(express.json());

app.use(router);
app.use(mdw.mdwError.errorMiddleware);

module.exports = app;
