// utilizar o model de User
const passport = require('passport');
const User = require('../models/User');

exports.login = (request, response) => {
    response.render('login');
};

exports.loginAction = (request, response) => {
    //response.render('');

    // cria uma função que recebe 3 args
    const auth = User.authenticate();

    // verifica a autenticação
    auth(request.body.email, request.body.password, (error, result) => {
        if (!result) {
            // houve erro
            request.flash('error', 'Seu e-mail e/ou senha estão incorretos.');
            response.redirect('/users/login');
            return;
        }

        // para fazer o login de fato
        request.login(result, () => {

        });

        // sucesso na autenticação
        request.flash('success', 'Foi logado!!!!');
        response.redirect('/');
    });
}

exports.register = (request, response) => {
    response.render('register');
};

exports.registerAction = (request, response) => {
    //response.json(request.body);

    // cria o novo Usuário
    const newUser = new User(request.body)

    //fazer o registro usando o passport já
    User.register(newUser, request.body.password, (error) => {
        if (error) {
            // algum problema na gravação
            request.flash('error', 'Ocorreu um erro, tente novamente mais tarde.');
            response.redirect('/users/register');
        }

        // sucesso na gravação
        request.flash('success', 'Registro efetuado com sucesso. Faça login.');
        response.redirect('/users/login');

    });
};

exports.logout = (request, response) => {
    request.logout();
    response.redirect('/');
};

exports.profile = (request, response) => {

    response.render('profile', {});
}

exports.profileAction = async (request, response) => {
    try {
        const user = await User.findOneAndUpdate(
            {
                _id: request.user._id // buscará pelo ID do usuário
            },
            {
                name: request.body.name, // nome a ser atualizado
                email: request.body.email // email a ser atualizado
            },
            {
                new: true, // para retornar as informações atualizadas
                runValidators: true // executar validações que por ventura tiver sido feito/incluído
            },
        );
    }
    catch (error) {
        request.flash('error', 'Ocorreu algum erro: ' + error.message);
        response.redirect('/profile');
    }

    request.flash('success', 'Dados atualizados com sucesso!');
    response.redirect('/profile');
}