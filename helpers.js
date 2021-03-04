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

    { name: 'Home', id: 'mHome', slug: '/', guest: true, logged: true },
    { name: 'Sobre', id: 'mSobre', slug: '/sobre', guest: true, logged: true },
    { name: 'Contato', id: 'mContato', slug: '/contato', guest: true, logged: true },
    { name: 'Login', id: 'mLogin', slug: '/users/login', guest: false, logged: false },
    { name: 'Cadastro', id: 'mCadastro', slug: '/users/register', guest: true, logged: false },
    { name: 'Add Post', id: 'mAddPost', slug: '/post/add', guest: false, logged: false },
    { name: 'Sair', id: 'mSair', slug: '/users/logout', guest: false, logged: false }
]