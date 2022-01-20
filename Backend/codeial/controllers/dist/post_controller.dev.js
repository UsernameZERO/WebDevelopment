"use strict";

var Post = require('../models/posts');

var Comment = require('../models/comment');

module.exports.create = function _callee(req, res) {
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
          req.flash('success', 'Posted successfully');
          return _context.abrupt("return", res.redirect('back'));

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          req.flash("error", _context.t0);
          return _context.abrupt("return");

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
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
            _context2.next = 12;
            break;
          }

          post.remove();
          _context2.next = 8;
          return regeneratorRuntime.awrap(Comment.deleteMany({
            post: req.params.id
          }));

        case 8:
          req.flash('success', 'post and comments in the post, deleted');
          return _context2.abrupt("return", res.redirect('back'));

        case 12:
          req.flash('error', 'you cannot delete this post');
          return _context2.abrupt("return", res.redirect('back'));

        case 14:
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          req.flash("error", _context2.t0);
          return _context2.abrupt("return");

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};