const express = require('express');

// Rotas
const router = express.Router();

// rota página inicial
router.get('/', (request, response) => {
    response.send(`
    <h1>
    Página Inicial
    </h1>

    <h2>
        <a href="/personalizada" style="text-decoration: none; color: #5555b5;">
            Ir para a página personalizada
        </a>
    </h2>
    `);
    
});

// rota personalizada
router.get('/personalizada', (request, response) => {
    response.send(`
    <h1>
    Página Personalizada
    </h1>

    <h2>
        <a href="/" style="text-decoration: none; color: #5555b5;">
            Ir para a página Inicial
        </a>
    </h2>
    `);
});

// configurações
const app = express();
app.use('/', router);
app.use('/personalizada', router);

module.exports = app;