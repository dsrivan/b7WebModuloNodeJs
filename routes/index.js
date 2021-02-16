const express = require('express');

// Rotas
const router = express.Router();

// rota página inicial
router.get('/', (request, response) => {

    let nome = request.query.nome
    let sobrenome = request.query.sobrenome

    response.send(`
    <div style="
        padding: 20px 50px;
        box-sizing: border-box;
        text-align: center;
    ">
        <h1 style="
            background-color: #0b5ed7;
            padding: 20px;
            font-family: Helvetica;
            text-transform: uppercase;
            border-radius: 5px;
            margin-bottom: 100px;
            color: #fff;
        ">
            Página Inicial
        </h1>

        <h2>
            ${nome}
            <br />
            ${sobrenome}
        </h2>

        <h3>
            <a href="/sobre" style="
                text-decoration: none;
                background-color: #157347;
                padding: 20px 40px;
                border-radius: 5px;
                color: #fff;
                font-family: Helvetica;
            ">
                Ir para a página sobre
            </a>
        </h3>
    </div>
    `);
    
});

// rota sobre
router.get('/sobre', (request, response) => {
    response.send(`
    <div style="
        padding: 20px 50px;
        box-sizing: border-box;
        text-align: center;
    ">
        <h1 style="
            background-color: #157347;
            padding: 20px;
            font-family: Helvetica;
            text-transform: uppercase;
            border-radius: 5px;
            margin-bottom: 100px;
            color: #fff;
        ">
            Página sobre
        </h1>

        <h3>
            <a href="/?nome=Ivan&sobrenome=da Silva Rosa" style="
                text-decoration: none;
                background-color: #0b5ed7;
                padding: 20px 40px;
                border-radius: 5px;
                color: #fff;
                font-family: Helvetica;
            ">
                Ir para a página Inicial
            </a>
        </h3>
    </div>
    `);
});

module.exports = router;