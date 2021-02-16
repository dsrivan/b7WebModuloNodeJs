const app = require('./app');

/* variáveis de ambiente */
require('dotenv').config({path:'variables.env'});

/* utiliza a porta configurada nas variáveis de ambiente, ou usa o padrão '7777' */
app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
    console.log('Servidor rodando na porta: ' + server.address().port);
});