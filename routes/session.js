const Controller    = require('../controller/session')
    , route         = require('express').Router();

route.post('/login', Controller.login);
route.post('/register', Controller.register);
route.post('/googlesignin', Controller.googleSignIn);
route.post('/facebooksignin', Controller.facebookSignIn)

module.exports = route