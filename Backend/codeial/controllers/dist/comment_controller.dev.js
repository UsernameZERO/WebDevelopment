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
            _context.next = 11;
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

          res.redirect('/');

        case 11:
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log('ERROR', _context.t0);
          return _context.abrupt("return");

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
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
            _context2.next = 13;
            break;
          }

          postId = comment.post;
          comment.remove();
          _context2.next = 9;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(postId, {
            $pull: {
              comments: req.params.id
            }
          }));

        case 9:
          _post2 = _context2.sent;
          return _context2.abrupt("return", res.redirect('back'));

        case 13:
          return _context2.abrupt("return", res.redirect('back'));

        case 14:
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log('ERROR', _context2.t0);
          return _context2.abrupt("return");

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};