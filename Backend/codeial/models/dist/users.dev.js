"use strict";

var mongoose = require('mongoose');

var multer = require('multer'); // for file uploads


var _require = require('path'),
    join = _require.join;

var path = require('path');

var AVATAR_PATH = path.join('/uploads/users/avatars');
var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
}, {
  timestamps: true
});
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', AVATAR_PATH));
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
}); //static

userSchema.statics.uploadedAvatar = multer({
  storage: storage
}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;
var User = mongoose.model('User', userSchema);
module.exports = User;