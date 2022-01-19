const Comment = require('../models/comment');
const Post = require('../models/posts');
const { post } = require('../routes/posts');

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

//Deleting the comment

module.exports.destroyc = (req,res)=>{
    
    Comment.findById(req.params.id,(err,comment)=>{
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}},(err,post)=>{
                return res.redirect('back');
            });
        }else{
        return res.redirect('back');
        }
    });
}