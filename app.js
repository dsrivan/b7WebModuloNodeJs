const express = require('express');

// Rotas
const router = require('./routes/index');

// configurações
const app = express();
app.use('/', router);
app.use('/personalizada', router);

app.use(express.json());

module.exports = app;