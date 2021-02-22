// para conectar ao banco
const mongoose = require('mongoose');

// passport local (login com bd local)
const passportLocalMongoose = require('passport-local-mongoose');

// configuração para utilizar a forma de comunicação mais atualizada
mongoose.Promise = global.Promise;

// estrutura de usuário
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

// add plugin passport dentro do userSchema
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);