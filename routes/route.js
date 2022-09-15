const route     = require('express').Router()
    , session   = require('./session')
    , movie     = require('./movie')
    , payment     = require('./payment');

route.get('/', (req, res) => {
    res.send("Ready");
});

route.use('/session', session)
route.use('/movie', movie)
route.use('/payment', payment)

module.exports = route