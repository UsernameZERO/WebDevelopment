"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX
var PostComments =
/*#__PURE__*/
function () {
  function PostComments(postId) {
    _classCallCheck(this, PostComments);

    // console.log("Entered class");
    this.postId = postId;
    this.postContainer = $("#post-".concat(postId)); // console.log(this.postContainer);

    this.newCommentForm = $("#post-".concat(postId, "-comments-form")); // console.log(this.newCommentForm);

    this.createComment(postId);
    var self = this; // call for all the existing comments

    $(' .delete-comment-button', this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  _createClass(PostComments, [{
    key: "createComment",
    value: function createComment(postId) {
      // console.log('Entered to creaeComment');
      var pSelf = this;
      this.newCommentForm.submit(function (e) {
        e.preventDefault();
        var self = this;
        console.log("new comment submitted");
        $.ajax({
          type: 'post',
          url: '/comments/create',
          data: $(self).serialize(),
          success: function success(data) {
            console.log(data);
            var newComment = pSelf.newCommentDom(data.data.comment, data.data.userName);
            console.log(newComment);
            $("#post-comments-".concat(postId)).prepend(newComment);
            console.log("appended");
            pSelf.deleteComment($(' .delete-comment-button', newComment));
            new Noty({
              theme: 'relax',
              text: "Comment published!",
              type: 'success',
              layout: 'topRight',
              timeout: 1500
            }).show();
          },
          error: function error(_error) {
            console.log(_error.responseText);
          }
        });
      });
    } //To display comment

  }, {
    key: "newCommentDom",
    value: function newCommentDom(comment, userName) {
      console.log("Entered to newCoMDOM");
      return $("<li id = \"comment-".concat(comment._id, "\">\n                        <p>\n\n                            <small>\n                                <a class=\"delete-comment-button\" href=\"/comments/destroy/").concat(comment._id, "\">\n                                DC</a\n                                >\n                            </small>\n                            ").concat(comment.content, "\n                            <br />\n                            <small>").concat(userName.user.name, "</small>\n                        </p>\n                </li>"));
    }
  }, {
    key: "deleteComment",
    value: function deleteComment(deleteLink) {
      // console.log($(deleteLink).prop('href'));
      $(deleteLink).click(function (e) {
        e.preventDefault();
        $.ajax({
          type: 'get',
          url: $(deleteLink).prop('href'),
          success: function success(data) {
            console.log(data);
            $("#comment-".concat(data.data.comment_id)).remove();
            new Noty({
              theme: 'relax',
              text: "Comment Deleted",
              type: 'success',
              layout: 'topRight',
              timeout: 1500
            }).show();
          },
          error: function error(_error2) {
            console.log(_error2.responseText);
          }
        });
      });
    }
  }]);

  return PostComments;
}();