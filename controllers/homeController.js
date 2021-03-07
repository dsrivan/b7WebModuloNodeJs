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

    // dados do usuário logado
    //console.log(request.user);

    // tag clicada na inicial (filtro)
    responseJson.tag = request.query.t;

    // para definir se irá filtrar por alguma tag ou se trará todos
    const postFilter = (responseJson.tag !== undefined) ? { tags: responseJson.tag } : {};

    // recuperar as tags de todos os posts
    const tagsPromise = Post.getTagsList();
    // o find, sem parâmetro, retorna todos os registros
    const postsPromise = Post.find(postFilter).populate('author');

    // irá executar as duas consultas ao mesmo tempo, e no retorno da primeira, o código continua para baixo
    const [tags, posts] = await Promise.all([tagsPromise, postsPromise]);
    // acima, utilizando o conceito de descontrução

    // se nenhuma tag estiver sido selecionada, esta será por default
    let tagAll = true;

    // looping para ver qual tag foi clicada e aplicar um css
    for (let i in tags) {
        if (tags[i]._id == responseJson.tag) {
            tags[i].class = "defaultTagActive";
            tagAll = false;
        }
    }

    // adiciona à request, as tags encontradas
    responseJson.tags = tags;
    //console.log(tags);

    // adiciona à request, os posts encontrados
    responseJson.posts = posts;

    // adiciona à request, se teve alguma tag selecionada
    responseJson.tagAll = tagAll;

    response.render('home', responseJson);
};