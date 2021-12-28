"use strict";

module.exports.home = function (req, res) {
  return res.end('<h1>Express is in Codeial</h1>');
};

module.exports.sign = function (req, res) {
  return res.send('<h1>You can sign up here</h1>');
};