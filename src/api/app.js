const express = require('express');
const router = require('../routes/router');
const mdw = require('../middlewares');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());

app.use(router);
app.use(mdw.mdwError.errorMiddleware);

module.exports = app;
