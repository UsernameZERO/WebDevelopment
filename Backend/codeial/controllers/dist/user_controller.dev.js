"use strict";

var User = require("../models/users");

module.exports.profile = function (req, res) {
  // return res.end('<h1>Users Profile</h1>');
  // return res.render('profile',{
  //     title : 'profile',
  // })
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (user) {
        return res.render('profile', {
          title: 'User profile',
          user: user
        });
      } else {
        return res.redirect('/users/signin');
      }
    });
  } else {
    return res.redirect('/users/signin');
  }
};

module.exports.signUp = function (req, res) {
  return res.render('signup', {
    title: 'signup'
  });
};

module.exports.login = function (req, res) {
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
  // Steps to authenticate
  // find the user
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      console.log('error in finding email in sign in');
      return;
    } // handle the user


    if (user) {
      // password mismatch
      if (user.password != req.body.password) {
        return res.redirect('back');
      } //create cookies to it


      res.cookie('user_id', user.id);
      return res.redirect('/users/profile');
    } else {
      //handle user not found
      return res.redirect('back');
    }
  });
};