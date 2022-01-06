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
  }
}, {
  timestamps: true
});
var Post = mongoose.model('Post', postSchema);
module.exports = Post;