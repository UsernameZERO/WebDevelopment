const Post = require('../models/posts');

module.exports.create = (req,res)=>{
    Post.create({
        content: req.body.content,
        user: req.user._id,
    },(err,post)=>{
        if (err) {
            console.log('err in creating the post');
            return;
        }
        return res.redirect('back');
    });
}