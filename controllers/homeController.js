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
        posts: [],
        tags: [],
        tag: ''
    };

    // tag clicada na inicial (filtro)
    responseJson.tag = request.query.t;

    // recuperar as tags de todos os posts
    const tags = await Post.getTagsList();

    // looping para ver qual tag foi clicada e aplicar um css
    for (let i in tags) {
        if (tags[i]._id == responseJson.tag) {
            tags[i].class = "selected";
        }
    }

    responseJson.tags = tags;
    //console.log(tags);

    // o find, sem parâmetro, retorna todos os registros
    const posts = await Post.find();
    // adiciona à request, os posts encontrados
    responseJson.posts = posts;

    response.render('home', responseJson);
};