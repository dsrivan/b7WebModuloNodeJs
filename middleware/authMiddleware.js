exports.isLogged = (request, response, next) => {
    if (!request.isAuthenticated()) {
        // não está logado
        request.flash('error', 'Você não tem permissão para acessar essa página.');
        response.redirect('/users/login');
        return;
    }

    // está logado
    next();
}

exports.changePassword = (request, response) => {
    // confirmar que as senhas digitadas são iguais
    if (request.body.password != request.body['password-confirm']) {
        request.flash('error', 'As senhas digitadas são diferentes.');
        response.redirect('/profile');
        return;
    }

    // procura usuário e troca a senha do usuário
    // esse setPassword(nova_senha, função de retorno) é um método da lib passport
    request.user.setPassword(request.body.password, async () => {
        await request.user.save(); // salvar no banco a nova senha

        request.flash('success', 'Senha alterada com sucesso!');
        response.redirect('/');
    });
}