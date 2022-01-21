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
          console.log(data.data);
          var newPost = newPostDom(data.data.post, data.data.userName);
          $('#posts-list-container>ul').prepend(newPost);
          deletePost($('.delete-post-button', newPost)); // call the create comment class
          // console.log(data.data.post._id);

          new PostComments(data.data.post._id);
          new Noty({
            theme: 'relax',
            text: "Post published!",
            type: 'success',
            layout: 'topRight',
            timeout: 1500
          }).show();
        },
        error: function (_error) {
          function error(_x) {
            return _error.apply(this, arguments);
          }

          error.toString = function () {
            return _error.toString();
          };

          return error;
        }(function (error) {
          console.log(error.responseText);
        })
      });
    });
  }; //method to create a post using dom


  var newPostDom = function newPostDom(post, userName) {
    return $("<li id=\"post-".concat(post._id, "\">\n                <p>\n                    <small>\n                        <a class = \"delete-post-button\" href=\"/posts/destroy/").concat(post._id, "\">D</a>\n                    </small>\n                \n                ").concat(post.content, "\n                    <br />\n                    <small> ").concat(userName.user.name, " </small>\n                </p>\n                <div class=\"post-comments\">\n                    <form\n                        id=\"post-").concat(post._id, "-comments-form\"\n                        action=\"/comments/create\"\n                        method=\"POST\"\n                    >\n                        <input\n                        type=\"text\"\n                        name=\"content\"\n                        placeholder=\"Type Here to add comment...\"\n                        required\n                        />\n                        <input type=\"hidden\" name=\"post\" value=\"").concat(post._id, "\" />\n                        <input type=\"submit\" value=\"Add Comment\" />\n                    </form>\n                    <div class=\"post-comments-list\">\n                        <ul id=\"post-comments-").concat(post._id, ">\">\n\n                        </ul>\n                    </div>\n                </div>\n            </li>"));
  }; //Delete a post 


  var deletePost = function deletePost(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function success(data) {
          $("#post-".concat(data.data.post_id)).remove();
          new Noty({
            theme: 'relax',
            text: "Post Deleted",
            type: 'success',
            layout: 'topRight',
            timeout: 1500
          }).show();
        },
        error: function (_error2) {
          function error(_x2) {
            return _error2.apply(this, arguments);
          }

          error.toString = function () {
            return _error2.toString();
          };

          return error;
        }(function (err) {
          console.log(error.responseText);
        })
      });
    });
  }; // loop over all the existing posts on the page 
  //(when the window loads for the first time) and call the delete post method 
  //on delete link of each, also add AJAX (using the class we've created) to the 
  //delete button of each


  var convertPostsToAjax = function convertPostsToAjax() {
    $('#posts-list-container>ul>li').each(function () {
      var self = $(this);
      var deleteButton = $(' .delete-post-button', self);
      deletePost(deleteButton); // get the post's id by splitting the id attribute

      var postId = self.prop('id').split("-")[1];
      new PostComments(postId);
    });
  };

  createPost();
  convertPostsToAjax();
}