"use strict";

var Comment = require('../models/comment');

var Post = require('../models/posts');

var _require = require('../routes/posts'),
    post = _require.post;

module.exports.create = function _callee(req, res) {
  var _post, comment, userData;

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
            _context.next = 18;
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

          _context.next = 12;
          return regeneratorRuntime.awrap(Post.findOne({
            user: req.user._id
          }).populate('user').exec());

        case 12:
          userData = _context.sent;

          if (!req.xhr) {
            _context.next = 16;
            break;
          }

          console.log('comment in req xhr');
          return _context.abrupt("return", res.status(200).json({
            data: {
              comment: comment,
              userName: userData
            },
            message: "Comment created!"
          }));

        case 16:
          req.flash('success', 'comment added to post');
          res.redirect('/');

        case 18:
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          req.flash('error', _context.t0);
          return _context.abrupt("return");

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
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
            _context2.next = 16;
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

          if (!req.xhr) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(200).json({
            data: {
              comment_id: req.params.id
            },
            message: "Comment deleted"
          }));

        case 12:
          req.flash('success', 'comment removed');
          return _context2.abrupt("return", res.redirect('back'));

        case 16:
          req.flash('error', 'you cannot remove comment');
          return _context2.abrupt("return", res.redirect('back'));

        case 18:
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          req.flash('error', 'err');
          return _context2.abrupt("return");

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 20]]);
};