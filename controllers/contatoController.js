const { response } = require("express");

exports.index = (request, response) => {
    response.render('contato');
};