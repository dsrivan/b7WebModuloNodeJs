const express = require('express');

// Rotas
const router = express.Router();

// rota página inicial
router.get('/', (request, response) => {

    /*let nome = request.query.nome;
    let sobrenome = request.query.sobrenome;

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

        <p>
            ${nome}
        </p>

        <a href="/sobre" style="
            display: inline-block;
            text-decoration: none;
            background-color: #157347;
            padding: 20px 40px;
            border-radius: 5px;
            color: #fff;
            font-family: Helvetica;
        ">
            Ir para a página sobre
        </a>

        <a href="/posts/111" style="
            display: inline-block;
            text-decoration: none;
            background-color: #424242;
            padding: 20px 40px;
            border-radius: 5px;
            color: #fff;
            font-family: Helvetica;
        ">
            Ler Post
        </a>
    </div>
    `);*/

    /*
    GET: request.query;
    POST: request.body;
    URL_PARAMS: request.params
    */
   
    response.json(request.query);
    
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

        <a href="/?nome=Ivan&sobrenome=dSR" style="
            isplay: inline-block;
            text-decoration: none;
            background-color: #0b5ed7;
            padding: 20px 40px;
            border-radius: 5px;
            color: #fff;
            font-family: Helvetica;
        ">
            Ir para a página Inicial
        </a>
    </div>
    `);
});

router.get('/posts/:id', (request, response) => {
    let id = request.params.id;
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
            Leitura do post ${id}
        </h1>

        <a href="/?nome=Ivan&sobrenome=dSR" style="
            isplay: inline-block;
            text-decoration: none;
            background-color: #0b5ed7;
            padding: 20px 40px;
            border-radius: 5px;
            color: #fff;
            font-family: Helvetica;
        ">
            Ir para a página Inicial
        </a>
    </div>
    `);
    
});

module.exports = router;