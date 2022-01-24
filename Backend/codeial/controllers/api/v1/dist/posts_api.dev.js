"use strict";

module.exports.index = function (req, res) {
  return res.json({
    message: "List of posts",
    posts: []
  });
};