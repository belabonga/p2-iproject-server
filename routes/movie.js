const Controller    = require('../controller/movie')
    , route         = require('express').Router();

route.get('/nowplaying', Controller.nowPlayingMovies)

module.exports = route
