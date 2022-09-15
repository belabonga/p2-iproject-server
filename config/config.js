// FOR FACEBOOKSTRATEGY WITHIN PASSPORT USES
module.exports = {
    'facebookAuth' : {
        'clientID' : process.env.FACEBOOK_CLIENT_ID,
        'clientSecret' : process.env.FACEBOOK_CLIENT_SECRET,
        'callbackURL' : 'http://localhost:3000/session/facebooksignin'
    }
}