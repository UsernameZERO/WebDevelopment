const Comment = require('../models/comment');
const Post = require('../models/posts');
const { post } = require('../routes/posts');

module.exports.create = async (req,res)=>{
    try {
        let post = await Post.findById(req.body.post);

        if(post){
             let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post,
            });
                post.comments.push(comment);
                post.save();
                res.redirect('/');
        }
    } catch (err) {
        console.log('ERROR',err);
        return;
    }
   
}

//Deleting the comment

module.exports.destroyc = async (req,res)=>{
    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

           let post = await Post.findByIdAndUpdate(postId,{ $pull: 
                {comments: req.params.id}});
                return res.redirect('back');
        }else {
        return res.redirect('back');
        }
    }catch (err) {
        console.log('ERROR',err);
        return;
    }
}