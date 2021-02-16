const express = require('express');

// Rotas
const router = express.Router();

// rota página inicial
router.get('/', (request, response) => {
    response.send('<h1>Página principal.</h1>');
});

// rota personalizada
router.get('/personalizada', (request, response) => {
    response.send('<h1>Página Personalizada</h1>');
});

// configurações
const app = express();
app.use('/', router);
app.use('/personalizada', router);

module.exports = app;