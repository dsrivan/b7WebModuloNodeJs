// para conectar ao banco
const mongoose = require('mongoose');

// para automatizar a criação de slugs (links)
const slug = require('slug');

// configuração para utilizar a forma de comunicação mais atualizada
mongoose.Promise = global.Promise;

// estrutura de post
const PostSchema = new mongoose.Schema({
    photo: String,
    title: {
        type: String,
        trim: true,
        required: 'O Título é obrigatório' // pode ser boolean
    },
    slug: String,
    body: {
        type: String,
        trim: true
    },
    tags: [String]
});

// evento para slug (pré salvar)
PostSchema.pre('save', function (next) {

    // verifica se o campo foi modificado
    if (this.isModified('title')) {
        // cria o slug com base no titulo do post
        this.slug = slug(this.title, { lower: true });
    }

    next();
});

module.exports = mongoose.model('Post', PostSchema);