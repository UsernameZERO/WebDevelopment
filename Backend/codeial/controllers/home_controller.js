

module.exports.home = function(req,res){

    // without using ejs we write in this way whether it is checking or not
   //return res.end('<h1>Express is in Codeial</h1>');

   //To use ejs
   return res.render('home',{
       title:"Home",
   });

   

}

module.exports.sign = (req,res)=>{
    return res.send('<h1>You can sign up here</h1>');
}