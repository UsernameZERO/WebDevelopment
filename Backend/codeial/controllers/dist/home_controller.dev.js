"use strict";

var Post = require("../models/posts");

var User = require('../models/users');

module.exports.home = function _callee(req, res) {
  var posts, users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Post.find({}).sort('-createdAt').populate('user').populate({
            path: 'comments',
            populate: {
              path: 'user'
            }
          }));

        case 3:
          posts = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.find({}));

        case 6:
          users = _context.sent;
          return _context.abrupt("return", res.render('home', {
            title: "Home",
            posts: posts,
            all_users: users
          }));

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log('Error', _context.t0);
          return _context.abrupt("return");

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};