const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = async (req,res)=>{
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        return res.redirect('back');
        
    } catch (err) {
        console.log("ERROR", err);
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
            return res.redirect('back');
    }else{
        return res.redirect('back');
    }
  }catch(err){
      console.log('Error',err);
  }
}