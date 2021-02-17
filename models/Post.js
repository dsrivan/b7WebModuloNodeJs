// para conectar ao banco
const mongoose = require('mongoose');

// configuração para utilizar a forma de comunicação mais atualizada
mongoose.Promise = global.Promise; 

// estrutura de post
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'O Título é obrigatório' // pode ser boolean
    },
    slug: String,
    body : {
        type: String,
        trim: true
    },
    tags: [String]
});

module.exports = mongoose.model('Post', PostSchema);