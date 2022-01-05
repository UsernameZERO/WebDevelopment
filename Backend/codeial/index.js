const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4444;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

//Static files
app.use(express.static('./assets'));

//To use in head and footer separately
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(expressLayouts);

//To set views engine
app.set('view engine','ejs');
app.set('views','./views');

// To encrypt 
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: "kbckbdca",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100),
    }

}));

app.use(passport.initialize());
app.use(passport.session());

//To Use Routers separately
app.use('/',require('./routes'));

//To check server is coonected or not
app.listen(port,(err)=>{
    if (err) {
        console.log(`Error running in the server ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});

