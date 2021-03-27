const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    storage: multer.memoryStorage(),// para salvar a imagem na memória
    fileFilter: (request, file, next) => {
        const allowed = ['image/jpeg', 'image/jpg', 'image/png']; // mimetype do arquivo (melhor do que extensão)
        if (allowed.includes(file.mimetype)) {
            next(null, true);
        } else {
            next({ message: 'Arquivo não suportado' }, false);
        }
    }
}

// responsável pelo upload da imagem
exports.upload = multer(multerOptions).single('photo');

// responsável por redimensionar a imagem
exports.resize = async (request, response, next) => {
    // verifica se tem algum arquivo sendo 'upado'
    if (!request.file) {
        next();
        return;
    }

    // guarda a extensão da imagem [jpeg ou jpg ou png]
    const extensao = request.file.mimetype.split('/')[1];

    // cria um nome aleatório (hash único) para a imagem
    let fileName = `${uuid.v4()}.${extensao}`;

    // insere o nome da foto na requisição
    request.body.photo = fileName;

    // let a foto para redimensionar
    const photo = await jimp.read(request.file.buffer);

    // redimensiona a foto (width, height)
    await photo.resize(800, jimp.AUTO);

    // salva a foto na pasta public/media
    await photo.write(`./public/media/${fileName}`);

    // vai para a próxima etapa
    next();
}