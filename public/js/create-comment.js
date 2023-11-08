//getting references to elements necessary for script functionality
//==============================================================
const commentTextBox = $('.create-comment-text');
const addCommentButton = $('.add-comment-button');
//==============================================================

//function to create a new comment
//==============================================================
const addComment = async () =>
{
  const postID = window.location.pathname.split("/")[2];
  console.log(postID);

  const text = commentTextBox.val();

  try
	{
    const response = await fetch(`/api/blog-post/comment/${postID}`,
    {
      method: "POST",
      body: JSON.stringify({text}),
      headers: {"Content-Type": "application/json"},
    });

    if (response.ok)
		{
			window.location.pathname = `/blog-post/${postID}`;
		}
		else
		{
			const error = await response.json();
			console.log(error.name);
		}
  }
  catch (err)
  {
    console.log(err);
  }
}
//==============================================================

//adding event listeners
//=========================================================
addCommentButton.on("click", addComment);
//=========================================================