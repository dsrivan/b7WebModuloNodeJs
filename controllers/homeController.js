const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.userMiddleware = (request, response, next) => {
    // esse é um middleware local

    // recupera os dados
    let info = {
        id: 123,
        name: 'Ivan',
    };

    // add os dados na requisição
    //request.userInfo = info;

    // após executar tudo no bloco, vai para a 'próxima função'
    next();
};

exports.index = async (request, response) => {
    let responseJson = {
        pageTitle: 'pageTitle',
        name: 'Ivan',
        posts: []
    };

    // o find, sem parâmetro, retorna todos os registros
    const posts = await Post.find();
    // adiciona à request, os posts encontrados
    responseJson.posts = posts;
    
    response.render('home', responseJson);
};