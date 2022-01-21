

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments {
    constructor(postId){
        // console.log("Entered class");
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        // console.log(this.postContainer);
        this.newCommentForm = $(`#post-${postId}-comments-form`);
        // console.log(this.newCommentForm);
        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        // console.log('Entered to creaeComment');
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;
            console.log("new comment submitted");
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    console.log(data);
                    let newComment = pSelf.newCommentDom(data.data.comment,data.data.userName);
                    console.log(newComment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    console.log("appended");
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }

            });
        });
    }

    //To display comment
    newCommentDom(comment,userName){
        console.log("Entered to newCoMDOM");
        return $(`<li id = "comment-${ comment._id}">
                        <p>

                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">
                                DC</a
                                >
                            </small>
                            ${comment.content}
                            <br />
                            <small>${userName.user.name}</small>
                        </p>
                </li>`
        );
    }

    deleteComment(deleteLink){
        // console.log($(deleteLink).prop('href'));
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


}