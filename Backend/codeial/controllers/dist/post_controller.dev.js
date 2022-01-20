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
          return _context.abrupt("return", res.redirect('back'));

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log("ERROR", _context.t0);
          return _context.abrupt("return");

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
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
            _context2.next = 11;
            break;
          }

          post.remove();
          _context2.next = 8;
          return regeneratorRuntime.awrap(Comment.deleteMany({
            post: req.params.id
          }));

        case 8:
          return _context2.abrupt("return", res.redirect('back'));

        case 11:
          return _context2.abrupt("return", res.redirect('back'));

        case 12:
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.log('Error', _context2.t0);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
};