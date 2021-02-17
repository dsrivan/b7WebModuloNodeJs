exports.userMiddleware = (request, response, next) => {
    // esse é um middleware local

    // recupera os dados
    let info = {
        id: 123,
        name: 'Ivan',
    };

    // add os dados na requisição
    request.userInfo = info;

    // após executar tudo no bloco, vai para a 'próxima função'
    next();
};

exports.index = (request, response) => {
    let obj = {
        pageTitle: 'pageTitle',
        userInfo: request.userInfo
    };
    
    response.render('home', obj);
};