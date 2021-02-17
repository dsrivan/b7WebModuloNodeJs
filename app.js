const express = require('express');

// Mustache (template engine)
const mustache = require('mustache-express');

// Rotas
const router = require('./routes');

const helpers = require('./helpers');

// handler de erros nas rotas
const errorHandler = require('./handlers/errorHandler');

// configurações
const app = express();

// helpers (middleware global)
app.use((request, response, next) => {
    //variáveis globais
    response.locals.h = helpers;
    next();
});

// para usar em formato json (middleware global)
app.use(express.json());

// rota inicial (middleware global)
app.use('/', router);

// middleware de página não encontrada
app.use(errorHandler.notFound);

// configura o (motor) template engine
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));

// especificando para o que o motor acima serve
app.set('view engine', 'mst');

// configura aonde está a pasta (__dirname pega o diretório)
app.set('views', __dirname + '/views');

module.exports = app;