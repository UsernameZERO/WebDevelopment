"use strict";

var Post = require('../models/posts');

var Comment = require('../models/comment');

module.exports.create = function _callee(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Post.create({
            content: req.body.content,
            user: req.user._id
          }));

        case 3:
          post = _context.sent;

          if (!req.xhr) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(200).json({
            data: {
              post: post
            },
            message: "Post is created!"
          }));

        case 6:
          req.flash('success', 'Posted successfully');
          return _context.abrupt("return", res.redirect('back'));

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          req.flash("error", _context.t0);
          return _context.abrupt("return");

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; //To delete a post


module.exports.destroy = function _callee2(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context2.sent;

          if (!(post.user == req.user.id)) {
            _context2.next = 14;
            break;
          }

          post.remove();
          _context2.next = 8;
          return regeneratorRuntime.awrap(Comment.deleteMany({
            post: req.params.id
          }));

        case 8:
          if (!req.xhr) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(200).json({
            data: {
              post_id: req.params.id
            },
            message: "Post deleted successfully"
          }));

        case 10:
          req.flash('success', 'post and comments in the post, deleted');
          return _context2.abrupt("return", res.redirect('back'));

        case 14:
          req.flash('error', 'you cannot delete this post');
          return _context2.abrupt("return", res.redirect('back'));

        case 16:
          _context2.next = 22;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          req.flash("error", _context2.t0);
          return _context2.abrupt("return");

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
};