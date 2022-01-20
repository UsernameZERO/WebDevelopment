const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

//Authentication using passport
passport.use(new LocalStrategy({
        usernameField:'email',
        passReqToCallback: true // for flash messages 
        
    },
    function(req,email, password, done){
        // find a user and establish the identity
        User.findOne({email : email},function(err,user){
            if (err) {
                req.flash('error',err);
                return done(err);
            }

            if (!user || user.password != password) {
                req.flash('error','Invalid Username/Password');
                return done(null, false);
            }
            return done(null,user);
        });
    }
));

//Serializing the user which key is used to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//Deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> passport');
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication = (req,res,next)=>{
    //if user is signed in then pass on the next one 
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed
    return res.redirect('/users/login');
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if (req.isAuthenticated()) {
        //req.user contains the current signed in user from the session - 
        // - cokkie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;