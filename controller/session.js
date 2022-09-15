const { Booking, Genre, Movie, Seat, User }             = require('../models/')

    // GOOGLE
    , { OAuth2Client }                                  = require("google-auth-library")
    , { hashPass, comparePass, signToken, verifyToken } = require('../helpers/index')

    // FACEBOOK 
    , passport                                          = require('passport')
    , FacebookStrategy                                  = require('passport-facebook').Strategy;


class Controller {
    //? LOGIN
    // POST /session/login
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // COMPARE EMAIL
            const checkUser = await User.findOne({
                where: { email },
            });

            // CHECK AND THROW ERROR
            if (!checkUser) {
                throw { name: "EMAIL_INVALID" };
            }

            // COMPARE PASSWORD
            const checkPassword = comparePass(password, checkUser.password);

            // CHECK AND THROW ERROR
            if (!checkPassword) {
                throw { name: "PASSWORD_INVALID" };
            }

            // CREATE TOKEN
            const payload = {
                id: checkUser.id,
            };

            // GET ACCESS TOKEN FROM .ENV FILE
            // env code : INIRAHASIABANGET
            const access_token = signToken(payload)

            // SEND DATA
            res.status(200).json({
                message: `USER ${checkUser.name} HAS LOGGED IN`,
                access_token : access_token,
                name: checkUser.name,
            });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    //?  REGISTER
    // POST /session/register
    static async register(req, res, next) {
        try {
        const { name, email, password } = req.body;

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            message: "USER HAS BEEN CREATED SUCCESSFULLY",
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });

        } catch (error) {
            next(error);
        }
    }

    //? SIGN IN / SIGN UP GOOGLE
    // POST /session/googlesignin
    static async googleSignIn(req, res, next) {
        try {

        const { access_token } = req.body;

        // npm install google-auth-library --save
        // https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: access_token,
            audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });

        const payload = ticket.getPayload();

        const user = await User.findOrCreate({
            where: { email: payload.email },
            defaults: {
                name: payload.given_name,
                email: payload.email,
                password: "passwordGoogle"
            },
            hooks: false, // TURNING OFF THE HOOKS
        });

        // THROW THE DATA
        const payload2 = {
            id: user[0].id,
        };

        const token = signToken(payload2);

        res.status(200).json({
            message: `USER ${user[0].name} HAS BEEN CREATED/LOGGED SUCCESSFULLY`,
            access_token: token,
            data: user,
        });
        } catch (error) {
            next(error);
        }
    }

    //! SIGN IN / SIGN UP FACEBOOK
    // POST /session/facebooksignin
    static async facebookSignIn(req, res, next) {
        try {
            const { access_token } = req.body;

                const { data } = await axios({
                  url: 'https://graph.facebook.com/v4.0/oauth/access_token',
                  method: 'get',
                  params: {
                    client_id: process.env.APP_ID_GOES_HERE,
                    client_secret: process.env.APP_SECRET_GOES_HERE,
                    redirect_uri: 'https://www.example.com/authenticate/facebook/',
                    code,
                  },
                });
                console.log(data); // { access_token, token_type, expires_in }

        
            res.status(200).json({
                // message: `USER ${user[0].name} HAS BEEN CREATED/LOGGED SUCCESSFULLY`,
                access_token: data.access_token,
                // data: user,
            });
        } catch (error) {
            
        }
    }
}

module.exports = Controller;