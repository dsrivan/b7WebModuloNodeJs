const express = require('express');

// Mustache (template engine)
const mustache = require('mustache-express');

// Rotas
const router = require('./routes/index');

const helpers = require('./helpers');

// configurações
const app = express();

// helpers
app.use((request, response, next) => {
    //variáveis globais
    response.locals.h = helpers;
    next();
});

// rota inicial
app.use('/', router);

// para usar em formato json
app.use(express.json());

// configura o (motor) template engine
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));

// especificando para o que o motor acima serve
app.set('view engine', 'mst');

// configura aonde está a pasta (__dirname pega o diretório)
app.set('views', __dirname + '/views');

module.exports = app;