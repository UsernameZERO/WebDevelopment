"use strict";

{
  //Method to submit the form data for new post using ajax
  var createPost = function createPost() {
    var newPostForm = $('#new-post-form');
    newPostForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'post',
        url: '/posts/create',
        data: newPostForm.serialize(),
        success: function success(data) {
          var newPost = newPostDom(data.data.post);
          $('#posts-list-container>ul').prepend(newPost);
        },
        error: function error(_error) {
          console.log(_error.responseText);
        }
      });
    });
  }; //method to create a post using dom


  var newPostDom = function newPostDom(post) {
    return $("<li id=\"post-".concat(post._id, "\">\n                <p>\n                    <small>\n                        <a class = \"delete-post-button\" href=\"/posts/destroy/").concat(post.id, "\">D</a>\n                    </small>\n                \n                ").concat(post.content, "\n                    <br />\n                    <small> ").concat(post.user.name, " </small>\n                </p>\n                <div class=\"post-comments\">\n                    <form action=\"/comments/create\" method=\"POST\">\n                        <input\n                        type=\"text\"\n                        name=\"content\"\n                        placeholder=\"Type Here to add comment...\"\n                        required\n                        />\n                        <input type=\"hidden\" name=\"post\" value=\"").concat(post._id, "\" />\n                        <input type=\"submit\" value=\"Add Comment\" />\n                    </form>\n                    <div class=\"post-comments-list\">\n                        <ul id=\"post-comments-").concat(post._id, ">\">\n\n                        </ul>\n                    </div>\n                </div>\n            </li>"));
  };

  createPost();
}