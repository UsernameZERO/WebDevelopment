const Comment = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = (req,res)=>{
   Post.findById(req.body.post,(err,post)=>{

    if(post){
        Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: req.body.post,
        },(err,comment)=>{
            if(err){
                console.log('Error in creation of comment');
                return;
            }
            post.comments.push(comment);
            post.save();
            res.redirect('/');
        });
    }
   });
}