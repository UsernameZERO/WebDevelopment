
const express = require('express');
const path = require('path');
const port = 4444;

const db = require('./config/mongoose');
const Contact = require('./model/contact');

const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('Assets'));

// //Creating middleware 1
// app.use((req,res,next)=>{
//     console.log('Middileware 1 is called');
//     next();
// })

// //Crreating middleware 2
// app.use((req,res,next)=>{
//     console.log('Middileware 2 is called');
//     next();
// })


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

    Contact.find({},function(err,contacts){
        if (err) {
            console.log('Error in fetching the contacts data from DB.');
            return;
        }
        return res.render('home',{
            title : "My Contact List",
            contact_lists: contacts
    });
    })
    //It is dynamic
//     return res.render('home',{
//         title : "My Contact List",
//         contact_lists: contactList
// });
});

app.get('/practice',(req,res)=>{
    return res.render('practice',{
        title : "Let us play with ejs"
    });
});

//For deleting a contact
app.get('/delete-contact',(req,res)=>{
    // Only by params
    // console.log(req.params);
    // let phone = req.params.phone;
    //By Query

    // let phone = req.query.phone;

    //To delete by id from the db
    let id = req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if (err) {
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
    // let index = contactList.findIndex(contact => contact.phone == phone );
    // if(index != -1){
    //      contactList.splice(index,1);
    // }
    // return res.redirect('back');
})

app.post('/create_contacts',(req,res)=>{
//    contactList.push({
//        name:req.body.name,
//        phone:req.body.phone,
//    });

//We can write in other way as well
    // contactList.push(req.body);

    //To push into database
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },(err,newContact)=>{
        if(err){
            console.log('Error is in creating contact!!');
             return;
        }
        console.log('*******',newContact);
        return res.redirect('back');
    });

//    return res.redirect('/');
// if the path is large then we can use
    // return res.redirect('back');
})

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
