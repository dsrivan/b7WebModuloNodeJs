const express = require('express');

// Rotas
const router = express.Router();

// controller Home
const homeController = require('../controllers/homeController');
const sobreController = require('../controllers/sobreController');
const userController = require('../controllers/userController');
const contatoController = require('../controllers/contatoController');
const postController = require('../controllers/postController');
const imageMiddleware = require('../middleware/imageMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// rota principal
router.get('/',
    homeController.userMiddleware,
    homeController.index
);

router.get('/sobre', sobreController.index);

router.get('/users/login', userController.login);
router.post('/users/login', userController.loginAction);
router.get('/users/logout', userController.logout);

router.get('/users/register', userController.register);
router.post('/users/register', userController.registerAction);

router.get('/users/forget', userController.forget);
router.post('/users/forget', userController.forgetAction);

router.get('/users/reset/:token', userController.forgetToken);

router.get('/profile',
    authMiddleware.isLogged,
    userController.profile
);
router.post('/profile',
    authMiddleware.isLogged,
    userController.profileAction
);

router.post('/profile/password',
    authMiddleware.isLogged,
    authMiddleware.changePassword,
);

router.get('/contato', contatoController.index);

router.get('/post/add',
    authMiddleware.isLogged,
    postController.add
);
router.post('/post/add',
    authMiddleware.isLogged,
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.addAction
);

router.get('/post/:slug/edit',
    authMiddleware.isLogged,
    postController.edit
);
router.post('/post/:slug/edit',
    authMiddleware.isLogged,
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.editAction
);

router.get('/post/:slug', postController.view);

module.exports = router;