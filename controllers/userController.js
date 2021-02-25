// utilizar o model de User
const User = require('../models/User');

// para gerar um dado específico (no caso, um token)
const crypto = require('crypto');

// serviço de envio de email
const mailHandler = require('../handlers/mailHandler');

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

exports.forget = (request, response) => {
    // abre o formulário para digitar o email (forgetAction)
    response.render('forget');
}

exports.forgetAction = async (request, response) => {
    /* ação executada logo após o forget */

    /* verifica se foi digitado algum email */
    if (request.body.email === "") {
        request.flash('info', 'Preencha corretamente o campo "E-mail".');
        response.redirect('/users/forget');
        return;
    }

    /* verifica se o email existe */
    const user = await User.findOne({
        'email': request.body.email
    }).exec();

    if (!user) {
        /* não foi encontrado usuário com esse email */
        request.flash('error', 'Houve um problema, tente novamente mais tarde.');
        response.redirect('/users/forget');
        return;
    }

    /* gera link com o token para trocar a senha */
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex'); // gera um token randomicamente
    user.resetPasswordTokenExpires = Date.now() + 3600000; // 3600000 = 1 hora
    await user.save();

    const resetLink = `http://${request.headers.host}/users/reset/${user.resetPasswordToken}`;

    const html = `Testando email com link: <a href="${resetLink}">Resetar sua senha</a>`;
    const text = `Testando email com link: ${resetLink}`;

    const to = `${user.name} <${user.email}>`;

    /* enviar o link via email para o usuário */
    mailHandler.send({
        to: to,
        subject: 'Resetar sua senha',
        html: html,
        text: text,
    });

    /* mensagem ao usuário e redirect */
    request.flash('success', 'As instruções foram enviadas para o seu email.');
    response.redirect('/users/login');
}

exports.forgetToken = async (request, response) => {
    /* verifica se o token existe e é válido */
    const user = await User.findOne({
        'resetPasswordToken': request.params.token,
        'resetPasswordTokenExpires': { $gt: Date.now() } // gt: maior que
    }).exec();

    /* se não foi encontrado um token válido */
    if (!user) {
        request.flash('error', 'Token expirado');
        response.redirect('/users/forget');
        return;
    }

    /* existe o token válido */
    response.render('forgetPassword');
}

exports.forgetTokenAction = async (request, response) => {
    /* verifica se foi digitado algum email */
    if (request.body.password === "" || request.body['password-confirm'] === "") {
        request.flash('info', 'Preencha corretamente os campos "Nova Senha" e "Confirmar Nova Senha".');
        response.redirect('back');
        return;
    }

    /* verifica se o token existe e é válido */
    const user = await User.findOne({
        'resetPasswordToken': request.params.token,
        'resetPasswordTokenExpires': { $gt: Date.now() } // gt: maior que
    }).exec();

    /* se não foi encontrado um token válido */
    if (!user) {
        request.flash('error', 'Token expirado');
        response.redirect('/users/forget');
        return;
    }

    // confirmar que as senhas digitadas são iguais
    if (request.body.password != request.body['password-confirm']) {
        request.flash('error', 'As senhas digitadas são diferentes.');
        response.redirect('back'); // volta para a tela anterior
        return;
    }

    // procura usuário e troca a senha do usuário
    user.setPassword(request.body.password, async () => {
        await user.save(); // salvar no banco a nova senha

        request.flash('success', 'Senha alterada com sucesso!');
        response.redirect('/');
    });
}