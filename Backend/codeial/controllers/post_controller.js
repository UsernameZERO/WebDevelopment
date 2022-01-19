const Post = require('../models/posts');
const Comment = require('../models/comment');

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

//To delete a post
module.exports.destroy = (req,res)=>{
    Post.findById(req.params.id, (err,post)=>{
        //id is converted to string
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post: req.params.id }, (err)=>{
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
}