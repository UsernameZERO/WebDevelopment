
//Required the library
const mongoose = require('mongoose');

//Connect to the DB
mongoose.connect('mongodb://localhost:27017/contact_lists_db');

//Acquire connection (to check if it is successfull)
const db = mongoose.connection

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open',()=>{
    console.log('Suceesfully connected to the DB');
})