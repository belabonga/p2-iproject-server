if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express           = require('express')
    , app               = express()
    , cors              = require('cors')
    , session           = require('express-session')
    , passport          = require('passport')
    , FacebookStrategy  = require('passport-facebook').Strategy
    
    , route             = require('./routes/route')
    , config            = require('./config/config');;

app.use(cors())
app.use(session({
    resave:false,
    saveUninitialized:true.valueOf,
    secret:'SECRET'
    }
))

app.use(express.urlencoded({ extended : false }))
app.use(express.json());

app.use('/', route)


// FACEBOOK
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT SESSION SETUP
passport.serializeUser(function (user, cb) {
    cb(null, user)
})
passport.serializeUser(function (obj, cb) {
    cb(null, obj)
})

// USE FACEBOOKSTRATEGY WITHIN PASSPORT
passport.use(new FacebookStrategy({
    clientID:config.facebookAuth.clientID,
    clientSecret:config.facebookAuth.clientSecret,
    callbackURL:config.facebookAuth.callbackURL
},
function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        //Check whether the User exists or not using profile.id
        if(config.use_database) {
          // if sets to true
          pool.query("SELECT * from user_info where user_id="+profile.id, (err,rows) => {
            if(err) throw err;
            if(rows && rows.length === 0) {
                console.log("There is no such user, adding now");
                pool.query("INSERT into user_info(user_id,user_name) VALUES('"+profile.id+"','"+profile.username+"')");
            } else {
                console.log("User already exists in database");
            }
          });
        }
        return done(null, profile);
    });
}
))


module.exports = app