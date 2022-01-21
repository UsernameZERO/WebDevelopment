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

                let userData = await Post.findOne({user : req.user._id}).populate('user').exec();
                if(req.xhr){
                  console.log('comment in req xhr');
                    return res.status(200).json({
                        data: {
                            comment: comment,
                            userName: userData
                        },
                        message: "Comment created!"
                    });
                }
                req.flash('success','comment added to post');
                res.redirect('/');
        }
    } catch (err) {
        req.flash('error',err);
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
            
            let post = await Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}});
                
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment deleted"
                });
            }
            req.flash('success','comment removed');
            return res.redirect('back');

        }else {
            req.flash('error','you cannot remove comment');
        return res.redirect('back');
        }
    }catch (err) {
        req.flash('error','err');
        return;
    }
}