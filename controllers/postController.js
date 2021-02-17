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
        // request.flash('error', 'Erro: ' + error.message);
        request.flash('error', 'Ocorreu um erro! Tente novamente mais tarde.');
        return response.redirect('/post/add');
    }
    // exibe mensagem flash
    request.flash('success', 'Post salvo com sucesso!');

    // redireciona para a home
    response.redirect('/');
};

exports.edit = async (request, response) => {
    // pegar as informações do post
    const post = await Post.findOne({ slug: request.params.slug });
    // carregar o formulário com as informações
    response.render('postEdit', { post });
};

exports.editAction = async (request, response) => {
    // procurar o item enviado e atualizar
    const post = await Post.findOneAndUpdate(
        { slug: request.params.slug },
        request.body,
        {
            new: true, // retorna o novo post atualizado
            runValidators: true // 
        }
        );

    // mostrar mensagem de sucesso
    request.flash('success', 'Post atualizado com sucesso!');
    // redirecionar para a home
    response.redirect('/');
};