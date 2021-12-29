const express = require('express');
const app = express();
const port = 4444;
const expressLayouts = require('express-ejs-layouts');

//Static files
app.use(express.static('./assets'));

//To use in head and footer separately
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(expressLayouts);
//To Use Routers separately
app.use('/',require('./routes'));

//To set views engine
app.set('view engine','ejs');
app.set('views','./views');

//To check server is coonected or not
app.listen(port,(err)=>{
    if (err) {
        console.log(`Error running in the server ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});

