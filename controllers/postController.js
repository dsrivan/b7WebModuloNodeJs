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

    // grava o post no banco
    await post.save();

    // redireciona para a home
    response.redirect('/');
};