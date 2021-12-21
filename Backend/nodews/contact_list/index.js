
const express = require('express');
const port = 4444;

const app = express();


app.get('/',(req,res)=>{
    res.send('<h1>Cool! its working yeeahh...</h1>')
})
app.get('/lol',(req,res)=>{
    res.send('<h1>Cool! its LOL working yeeahh...</h1>')
})

app.listen(port,(err)=>{
if (err) {
    console.log('Error is running on server',err);
}
console.log('My Express server is running on port :',port);
});
