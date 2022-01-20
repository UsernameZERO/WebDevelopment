const Post = require("../models/posts");
const User = require('../models/users');

module.exports.home = async function(req,res){

    // without using ejs we write in this way whether it is checking or not
   //return res.end('<h1>Express is in Codeial</h1>');

   //To use ejs
   
    // Post.find({},(err,posts)=>{
    //     return res.render('home',{
    //         title:"Codieal | Home",
    //         posts : posts
    //     });
    // })


    // populate the user of each post


    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user',
    //     }
    // })
    // .exec((err,posts)=>{
    //     User.find({}, (err,users)=>{
    //         return res.render('home',{
    //             title:"Home",
    //             posts : posts,
    //             all_users: users
    //         });

    //     })
    // });
   
    try {
        //Populating the user of each post
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
            }
        });

        let users = await User.find({});

        return res.render('home',{
        title:"Home",
        posts: posts,
        all_users: users
        }); 
    } catch (err) {
        console.log('Error',err);
        return;
    }
   
}
