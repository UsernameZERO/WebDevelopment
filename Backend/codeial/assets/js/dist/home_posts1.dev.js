"use strict";

{
  // method to submit the form data for new post using AJAX
  var createPost = function createPost() {
    var newPostForm = $('#new-post-form');
    newPostForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'post',
        url: '/posts/create',
        data: newPostForm.serialize(),
        success: function success(data) {
          console.log(data);
          var newPost = newPostDom(data.data.post, data.data);
          $('#posts-list-container>ul').prepend(newPost);
          deletePost($(' .delete-post-button', newPost)); // call the create comment class

          new PostComments(data.data.post._id);
          new Noty({
            theme: 'relax',
            text: "Post published!",
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
  }; // method to create a post in DOM


  var newPostDom = function newPostDom(post, dataN) {
    return $("<li id=\"post-".concat(post._id, "\">\n                    <p>\n                        \n                        <small>\n                            <a class=\"delete-post-button\"  href=\"/posts/destroy/").concat(post._id, "\">DP</a>\n                        </small>\n                       \n                        ").concat(post.content, "\n                        <br>\n                        <small>\n                        ").concat(dataN.userName, "\n                        </small>\n                    </p>\n                    <div class=\"post-comments\">\n                        \n                            <form id=\"post-").concat(post._id, "-comments-form\" action=\"/comments/create\" method=\"POST\">\n                                <input type=\"text\" name=\"content\" placeholder=\"Type Here to add comment...\" required>\n                                <input type=\"hidden\" name=\"post\" value=\"").concat(post._id, "\" >\n                                <input type=\"submit\" value=\"Add Comment\">\n                            </form>\n               \n                \n                        <div class=\"post-comments-list\">\n                            <ul id=\"post-comments-").concat(post._id, "\">\n                                \n                            </ul>\n                        </div>\n                    </div>\n                    \n                </li>"));
  }; // method to delete a post from DOM


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
        error: function error(_error2) {
          console.log(_error2.responseText);
        }
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