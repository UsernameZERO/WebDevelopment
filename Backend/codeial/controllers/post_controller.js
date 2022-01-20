const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = async (req,res)=>{
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        req.flash('success','Posted successfully');
        return res.redirect('back');
        
    } catch (err) {
        req.flash("error", err);
        return;
    }
    
}

//To delete a post
module.exports.destroy = async (req,res)=>{
  try{
    let post =  await Post.findById(req.params.id)
    //id is converted to string
    if(post.user == req.user.id){
        post.remove();
        await Comment.deleteMany({post: req.params.id });
        req.flash('success','post and comments in the post, deleted');
            return res.redirect('back');
    }else{
        req.flash('error','you cannot delete this post');
        return res.redirect('back');
    }
  }catch(err){
      req.flash("error", err);
      return;
  }
}