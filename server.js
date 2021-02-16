const app = require('./app');
const mongoose = require('mongoose');

/* variáveis de ambiente */
require('dotenv').config({path:'variables.env'});

/* conectar ao mongoose, que no caso foi configurada nas variáveis de ambiente */
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
});

/* para falar que pode utilizar conceitos do ES6+ */
mongoose.Promise = global.Promise;

/* monitorar logs */
mongoose.connection.on('error', (error) => {
    console.error('Erro: ' + error.message);
});

/* utiliza a porta configurada nas variáveis de ambiente, ou usa o padrão '7777' */
app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
    console.log('Servidor rodando na porta: ' + server.address().port);
});