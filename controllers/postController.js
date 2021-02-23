// para utilizar o banco
const mongoose = require('mongoose');

// // para utilizar o model Post
const Post = mongoose.model('Post');

const slug = require('slug');

exports.add = (request, response) => {
    response.render('postAdd');
};

exports.addAction = async (request, response) => {
    // transforma a string de tags em array de tags separados por vírgula
    request.body.tags = request.body.tags.split(',').map(tag => tag.trim());

    // pegar o id com base na autenticação do usuário logado
    request.body.author = request.user._id;

    // cria o tipo de post com base no model Post
    const post = new Post(request.body);

    try {
        // grava o post no banco
        await post.save();
    } catch (error) {
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
    // transforma a string de tags em array de tags separados por vírgula
    request.body.tags = request.body.tags.split(',').map(tag => tag.trim());

    /* gerar o novo slug que era feito via middleware (pois o mid não é mais executado quando roda-se o 'findOneAndUpdate') */
    request.body.slug = slug(request.body.title, { lower: true, });

    try {
        // procurar o item enviado e atualizar
        const post = await Post.findOneAndUpdate(
            { slug: request.params.slug },
            request.body,
            {
                new: true, // retorna o novo post atualizado
                runValidators: true // 
            }
        );
    } catch (error) {
        // request.flash('error', 'Erro: ' + error.message);
        request.flash('error', 'Ocorreu um erro! Tente novamente mais tarde.');
        return response.redirect('/post/' + request.params.slug + '/edit');
    }

    // mostrar mensagem de sucesso
    request.flash('success', 'Post atualizado com sucesso!');
    // redirecionar para a home
    response.redirect('/');
};

exports.view = async (request, response) => {
    const post = await Post.findOne({ slug: request.params.slug });
    response.render('view', { post });
}