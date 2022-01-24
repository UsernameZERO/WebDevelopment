const Post = require('../../../models/posts');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
            }
        });

    return res.json(200,{
        message: "List of posts",
        posts: posts
    });
}

module.exports.destroy = async (req,res)=>{
    try{
      let post =  await Post.findById(req.params.id)
      //id is converted to string
      if(post.user == req.user.id){
          post.remove();
          await Comment.deleteMany({post: req.params.id });
        //   req.flash('success','post and comments in the post, deleted');
              return res.json(200,{
                  message: "post associated with comments are deleted."
              });
      }else{
          return res.json(401,{
              message: "you cannot delete this post"
          });
      }
    }catch(err){
        console.log("**** postsapi destry",err);
        return res.json(500,{
            message: "Internal Server Error"
        });
    }
  }