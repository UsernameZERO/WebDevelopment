
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){

    User.findById(jwtPayload._id, (err,user)=>{
        if (err) {
            console.log('Error in finding user in JWT',err);
        }
        if (user) {
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}))