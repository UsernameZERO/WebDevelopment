"use strict";

var mongoose = require('mongoose');

var commentsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
}, {
  timestamps: true
});
var Comment = mongoose.model('Comment', commentsSchema);
module.exports = Comment;