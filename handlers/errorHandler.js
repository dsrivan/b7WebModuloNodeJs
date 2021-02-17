exports.notFound = (request, response, next) => {

    // seta o status da requisição como 404 (não encontrado)
    response.status = 404;
    
    // chamará a página na views
    response.render('404');


};