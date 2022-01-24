"use strict";

var Post = require('../../../models/posts');

var Comment = require('../../../models/comment');

module.exports.index = function _callee(req, res) {
  var posts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Post.find({}).sort('-createdAt').populate('user').populate({
            path: 'comments',
            populate: {
              path: 'user'
            }
          }));

        case 2:
          posts = _context.sent;
          return _context.abrupt("return", res.json(200, {
            message: "List of posts",
            posts: posts
          }));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

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
            _context2.next = 11;
            break;
          }

          post.remove();
          _context2.next = 8;
          return regeneratorRuntime.awrap(Comment.deleteMany({
            post: req.params.id
          }));

        case 8:
          return _context2.abrupt("return", res.json(200, {
            message: "post associated with comments are deleted."
          }));

        case 11:
          return _context2.abrupt("return", res.json(401, {
            message: "you cannot delete this post"
          }));

        case 12:
          _context2.next = 18;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.log("**** postsapi destry", _context2.t0);
          return _context2.abrupt("return", res.json(500, {
            message: "Internal Server Error"
          }));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
};