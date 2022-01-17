"use strict";

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  //include array of ids of all comments in this post schema itself
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});
var Post = mongoose.model('Post', postSchema);
module.exports = Post;