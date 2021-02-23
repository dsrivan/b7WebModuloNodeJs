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