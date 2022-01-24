"use strict";

var User = require('../../../models/users');

var jwt = require('jsonwebtoken');

module.exports.create_signin = function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 2:
          user = _context.sent;
          _context.prev = 3;

          if (!(!user || user.password != req.body.password)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.json(422, {
            message: "Invalid username or password"
          }));

        case 6:
          return _context.abrupt("return", res.json(200, {
            message: "Sign in successfull, here is token keep it safe",
            data: {
              token: jwt.sign(user.toJSON(), 'codeial', {
                expiresIn: '100000'
              })
            }
          }));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](3);
          console.log("****", _context.t0);
          return _context.abrupt("return", res.json(500, {
            message: "Internal Server Error"
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 9]]);
};