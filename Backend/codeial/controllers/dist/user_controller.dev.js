"use strict";

var User = require("../models/users");

module.exports.profile = function (req, res) {
  // return res.end('<h1>Users Profile</h1>');
  User.findById(req.params.id, function (err, user) {
    return res.render('profile', {
      title: 'profile',
      profile_user: user
    });
  });
};

module.exports.update = function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.user.id == req.params.id)) {
            _context.next = 14;
            break;
          }

          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 4:
          user = _context.sent;
          User.uploadedAvatar(req, res, function (err) {
            if (err) {
              console.log('****Multer ERROR: ', err);
            }

            user.name = req.body.name;
            user.email = req.body.email;

            if (req.file) {
              //This is saving the path of the upload file into the avatar field in the user
              user.avatar = User.avatarPath + '/' + req.file.filename;
            } // console.log(req.file);// to check whether uploaded or not when uploaded


            user.save();
            return res.redirect('back');
          });
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          req.flash("error", _context.t0);
          return _context.abrupt("return", res.redirect('back'));

        case 12:
          _context.next = 16;
          break;

        case 14:
          req.flash('error', 'Unauthorized');
          return _context.abrupt("return", res.status(401).send('Unauthorized'));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('signup', {
    title: 'signup'
  });
};

module.exports.login = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('login', {
    title: 'login'
  });
};

module.exports.create_signup = function (req, res) {
  if (req.body.password != req.body.C_password) {
    return res.redirect('back');
  }

  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      console.log('error in finding user in signing up');
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log('error in creating user in signing up');
          return;
        }

        return res.redirect('/users/login');
      });
    } else {
      return res.redirect('back');
    }
  });
};

module.exports.create_signin = function (req, res) {
  req.flash('success', 'Logged in Successfully');
  return res.redirect('/');
};

module.exports.signout = function (req, res) {
  req.logout(); // it is to remove the cookie that was used through passport library

  req.flash('success', 'You have Logged out ');
  return res.redirect('/');
};