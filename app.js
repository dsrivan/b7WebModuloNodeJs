const express = require('express');

// Mustache (template engine)
const mustache = require('mustache-express');

// cookie (mensagens flash)
const cookieParser = require('cookie-parser');

// sessão (mensagens flash)
const session = require('express-session');

// sessão (mensagens flash)
const flash = require('express-flash');

// autenticação
const passport = require('passport');

// 
const LocalStrategy = require('passport-local').Strategy;

// Rotas
const router = require('./routes');

const helpers = require('./helpers');

// handler de erros nas rotas
const errorHandler = require('./handlers/errorHandler');

// configurações
const app = express();

// para usar em formato json (middleware global)
app.use(express.json());

//
app.use(express.urlencoded({ extended: true }));

// colocar a pasta public como pasta estática
app.use(express.static(__dirname + '/public'));

// habilita o cookie
app.use(cookieParser(process.env.SECRET));

// habilita o session
app.use(session({
    secret: process.env.SECRET,
    resave: false, // não precisa destruir e recriada caso nada ter sido alterado
    saveUninitialized: false // não salva a sessão se ela for iniciada sem nenhum dado
}));

// habilita o flash
app.use(flash());

// inicializar o passport
app.use(passport.initialize());

// inicializar a sessão de login
app.use(passport.session());

// model de usuários
const User = require('./models/User');

// é o passport que usará o modelo de usuário
passport.use(new LocalStrategy(User.authenticate()));

//
passport.serializeUser(User.serializeUser());

//
passport.deserializeUser(User.deserializeUser());

/*  helpers (middleware global) 
    disponibiliza para todo o sistema, para não ter que ficar repetindo 
*/
app.use((request, response, next) => {
    //variáveis globais
    //response.locals.h = helpers; // assim passa efetivamente O helpers
    response.locals.h = { ...helpers }; // assim passa somente os valores do helpers

    // flashes disponíveis globalmente
    response.locals.flashes = request.flash();

    //global, acessível em qualquer local do sistema (trata-se do usuário logado)
    response.locals.user = request.user;

    // efetua o controle da visibilidade dos itens do menu
    if (request.isAuthenticated()) {
        //filtra o menu, exibindo somente o que tem TRUE em LOGGED(logado)
        response.locals.h.menu = response.locals.h.menu.filter(i => (i.logged));
    } else {
        //filtra o menu, exibindo somente o que tem TRUE em GUEST(visitante)
        response.locals.h.menu = response.locals.h.menu.filter(i => (i.guest));
    }

    next();
});

// rota inicial (middleware global)
app.use('/', router);

// middleware de página não encontrada
app.use(errorHandler.notFound);

// configura o (motor) template engine
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));

// especificando para o que o motor acima serve
app.set('view engine', 'mst');

// configura aonde está a pasta (__dirname pega o diretório)
app.set('views', __dirname + '/views');

module.exports = app;