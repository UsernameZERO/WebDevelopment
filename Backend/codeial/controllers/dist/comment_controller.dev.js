"use strict";

var Comment = require('../models/comment');

var Post = require('../models/posts');

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
};