const { Booking, Genre, Movie, Seat, User } = require('../models/')
    // , MovieDB                               = require('moviedb')(process.env.TMDB_API_KEY)
    // , fetch                                 = require("node-fetch")
    // , MovieDB                               = require('node-themoviedb')
    // , mdb                                   = new MovieDB(process.env.TMDB_API_KEY, 'en-US')
    , axios                                 = require('axios');;

const API_KEY           = '?api_key=' + process.env.TMDB_API_KEY
    , BASE_URL          = 'https://api.themoviedb.org/3'
    , NOW_PLAYING_URL   = BASE_URL + '/movie/now_playing' + API_KEY
    // , API_URL           = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY
    // , IMG_URL           = 'https://image.tmdb.org/t/p/w500'
    // , searchURL         = BASE_URL + '/search/movie?' + API_KEY;

// CHECK TMDB API KEY
if(!API_KEY) {
    throw { name : 'INVALID_TMDB_API_KEY' }
}

class Controller {

    //? GET movie/
    //? TMDB :  Now Playing
    static async nowPlayingMovies(req, res, next) {
        try {
            const nowPlayingMovies = await axios.get(`${NOW_PLAYING_URL}`)

            if(!nowPlayingMovies){
                throw { name : 'FAILED_GET_DATAS' }
            }
                
            res.json({
                data : nowPlayingMovies.data.results
            });

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = Controller;