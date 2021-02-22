// utilizar o model de User
const passport = require('passport');
const User = require('../models/User');

exports.login = (request, response) => {
    response.render('login');
};

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
            console.log('erro ao registrar', error);
            response.redirect('/');
        }

        // sucesso na gravação
        response.redirect('/');

    });
};