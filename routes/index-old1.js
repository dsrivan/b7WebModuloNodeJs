const express = require('express');

// Rotas
const router = express.Router();

// rota principal
router.get('/', (request, response) => {
    let obj = {
        nome: request.query.nome,
        sobrenome: request.query.sobrenome,
        idade: request.query.idade,
        mostrar: true,
        itens: [
            { nome: 'caneta', qt: '20'},
            { nome: 'caderno', qt: '4'},
            { nome: 'mesa', qt: '41'}
        ],
        interesses: ["js", "react"],
        //interesses: [],
        passarHtml: '<strong>texto em negrito</strong>',
        pageTitle: 'pageTitle'
    }
    response.render('home', obj);
});

router.get('/sobre', (request, response) => {
    response.render('sobre');
})

module.exports = router;