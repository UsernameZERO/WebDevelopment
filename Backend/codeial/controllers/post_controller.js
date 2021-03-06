const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try {
       let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        
         let userData = await Post.findOne({user : req.user._id}).populate('user').exec();
        //adding  ajax 
        if(req.xhr){
            
            // post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    post : post,
                    userName : userData.user.name
                },
                message: "Post is created!"
            });
        }

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

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post_id: req.params.id,

                },
                message: "Post deleted successfully"
            });
        }

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