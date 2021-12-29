
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codeial_db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting in DB'));

db.once('open',()=>{
   
     console.log(`succeesfully connected MongoDB`);
    
});