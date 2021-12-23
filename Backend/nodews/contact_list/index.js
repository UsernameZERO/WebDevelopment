
const express = require('express');
const path = require('path');
const port = 4444;


const app = express();
app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

let contactList = [
    {
        name:'Zero',
        phone:'0987654321'
    },
    {
        name:'Vicious',
        phone:'4448889992'
    },
    {
        name:'LOL',
        phone:'9900443322'
    }
];

app.get('/',(req,res)=>{
    //It is static
    // return res.render('home');

    //It is dynamic
    return res.render('home',{
        title : "My Contact List",
        contact_lists: contactList
});
});

app.get('/practice',(req,res)=>{
    return res.render('practice',{
        title : "Let us play with ejs"
    });
});

// app.get('/',(req,res)=>{
//     console.log(req);
//     res.send('<h1>Cool! its working yeeahh...</h1>')
// })
// app.get('/lol',(req,res)=>{
//     res.send('<h1>Cool! its LOL working yeeahh...</h1>')
// })

app.listen(port,(err)=>{
if (err) {
    console.log('Error is running on server',err);
}
console.log('My Express server is running on port :',port);
});
