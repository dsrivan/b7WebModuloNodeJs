const { response } = require("express");

exports.login = (request, response) => {
    response.render('login');
};