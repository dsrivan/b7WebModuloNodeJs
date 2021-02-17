const express = require('express');

// Rotas
const router = express.Router();

// controller Home
const homeController = require('../controllers/homeController');
const sobreController = require('../controllers/sobreController');
const userController = require('../controllers/userController');
const contatoController = require('../controllers/contatoController');

// rota principal
router.get('/', homeController.userMiddleware, homeController.index);

router.get('/sobre', sobreController.index);

router.get('/users/login', userController.login);

router.get('/contato', contatoController.index);

module.exports = router;