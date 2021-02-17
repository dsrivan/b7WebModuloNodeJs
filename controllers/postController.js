// para utilizar o banco
const mongoose = require('mongoose');

// // para utilizar o model Post
const Post = mongoose.model('Post');

exports.add = (request, response) => {
    response.render('postAdd');
};

exports.addAction = async (request, response) => {

    // cria o tipo de post com base no model Post
    const post = new Post(request.body);

    try {
        // grava o post no banco
        await post.save();
    } catch(error) {
        request.flash('error', 'Erro: ' + error.message);
        return request.redirect('/post/add');
        /* o return é para parar a execução do código */
    }
    // exibe mensagem flash
    request.flash('success', 'Post salvo com sucesso!');

    // redireciona para a home
    response.redirect('/');
};