"use strict";

var Comment = require('../models/comment');

var Post = require('../models/posts');

var _require = require('../routes/posts'),
    post = _require.post;

module.exports.create = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
    if (post) {
      Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post
      }, function (err, comment) {
        if (err) {
          console.log('Error in creation of comment');
          return;
        }

        post.comments.push(comment);
        post.save();
        res.redirect('/');
      });
    }
  });
}; //Deleting the comment


module.exports.destroyc = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (comment.user == req.user.id) {
      var postId = comment.post;
      comment.remove();
      Post.findByIdAndUpdate(postId, {
        $pull: {
          comments: req.params.id
        }
      }, function (err, post) {
        return res.redirect('back');
      });
    } else {
      return res.redirect('back');
    }
  });
};