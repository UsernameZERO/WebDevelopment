"use strict";

var Comment = require('../models/comment');

var Post = require('../models/posts');

var _require = require('../routes/posts'),
    post = _require.post;

module.exports.create = function _callee(req, res) {
  var _post, comment;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.body.post));

        case 3:
          _post = _context.sent;

          if (!_post) {
            _context.next = 12;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: req.body.post
          }));

        case 7:
          comment = _context.sent;

          _post.comments.push(comment);

          _post.save();

          req.flash('success', 'comment added to post');
          res.redirect('/');

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          req.flash('error', _context.t0);
          return _context.abrupt("return");

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}; //Deleting the comment


module.exports.destroyc = function _callee2(req, res) {
  var comment, postId, _post2;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Comment.findById(req.params.id));

        case 3:
          comment = _context2.sent;

          if (!(comment.user == req.user.id)) {
            _context2.next = 14;
            break;
          }

          postId = comment.post;
          comment.remove();
          req.flash('success', 'comment removed');
          _context2.next = 10;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(postId, {
            $pull: {
              comments: req.params.id
            }
          }));

        case 10:
          _post2 = _context2.sent;
          return _context2.abrupt("return", res.redirect('back'));

        case 14:
          req.flash('error', 'you cannot remove comment');
          return _context2.abrupt("return", res.redirect('back'));

        case 16:
          _context2.next = 22;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          req.flash('error', 'err');
          return _context2.abrupt("return");

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
};