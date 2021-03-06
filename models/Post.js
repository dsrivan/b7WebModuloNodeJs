// para conectar ao banco
const mongoose = require('mongoose');

// para automatizar a criação de slugs (links)
const slug = require('slug');

// configuração para utilizar a forma de comunicação mais atualizada
mongoose.Promise = global.Promise;

// criação de ID
const ObjectId = mongoose.Schema.Types.ObjectId;

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
    tags: [String],
    author: {
        type: ObjectId,
        ref: 'User'
    },
});

// evento para slug (pré salvar)
PostSchema.pre('save', async function (next) {

    // verifica se o campo foi modificado
    if (this.isModified('title')) {
        // cria o slug com base no titulo do post
        this.slug = slug(this.title, { lower: true });

        // regex para ver se o nome de slug criado automaticamente já existe no banco
        const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i');

        // busca se existe, com base na regex
        const postsWithSlug = await this.constructor.find({ slug: slugRegex });

        // verifica se esse slug
        if (postsWithSlug.length > 0) {
            // pegará o tamanho do retorno e add + 1
            this.slug = `${this.slug}-${postsWithSlug.length + 1}`;
        }
    }

    next();
});

PostSchema.statics.getTagsList = function () {
    return this.aggregate([
        { $unwind: '$tags' }, // separa posts por tags, ex: post com 3 tags, irá replicar 3x o post, 1 para cada tag
        { $group: { _id: '$tags', count: { $sum: 1 } } }, // agrupar em tags / fazer contagem de cada tag
        { $sort: { count: -1, _id: 1 } } // ordena Decrescente pelo COUNT de tag e alfabeticamente
    ]);
}

module.exports = mongoose.model('Post', PostSchema);