module.exports.isLogged = (request, response, next) => {
    if (!request.isAuthenticated()) {
        // não está logado
        request.flash('error', 'Você não tem permissão para acessar essa página.');
        response.redirect('/users/login');
        return;
    }

    // está logado
    next();
};