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
            next({message: 'Arquivo não suportado'}, false);
        }
    }}

// responsável pelo upload da imagem
exports.upload = multer(multer).single('photo');

// responsável por redimensionar a imagem
exports.resize = () => {
    //
}