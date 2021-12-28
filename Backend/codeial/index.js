const express = require('express');
const app = express();
const port = 4444;

//To Use Routers separately
app.use('/',require('./routes'));

//To check server is coonected or not
app.listen(port,(err)=>{
    if (err) {
        console.log(`Error running in the server ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});

