exports.defaultPageTitle = "Default";

exports.menu = [
    /* ESTRUTURA
        { 
            name: 'Home', // label que aparecerá na página
            slug: '/', // 'link'
            guest: true, // visível à visitante (não logado)?
            logged: true  // visível à logados?
        }
    */

    { name: 'Home', slug: '/', guest: true, logged: true },
    { name: 'Sobre', slug: '/sobre', guest: true, logged: true },
    { name: 'Contato', slug: '/contato', guest: true, logged: true },
    { name: 'Login', slug: '/users/login', guest: false, logged: false },
    { name: 'Cadastro', slug: '/users/register', guest: true, logged: false },
    { name: 'Add Post', slug: '/post/add', guest: false, logged: false },
    { name: 'Sair', slug: '/users/logout', guest: false, logged: false }
]