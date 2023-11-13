//getting references to elements necessary for script functionality
//==============================================================
const commentTextBox = $('.create-comment-text');
const addCommentButton = $('.add-comment-button');
//==============================================================

//function to create a new comment
//==============================================================
const addComment = async () =>
{
  //retrieves post ID from browser path
  const postID = window.location.pathname.split("/")[2];

  //retrieves comment text from comment text box
  const text = commentTextBox.val();

  try
	{
    //sends comment text to server via a POST request to create a new comment under the appropriate post using the post's ID
    const response = await fetch(`/api/blog-post/comment/${postID}`,
    {
      method: "POST",
      body: JSON.stringify({text}),
      headers: {"Content-Type": "application/json"},
    });

    //if the comment was successfully posted, refresh the page to show the new comment
    if (response.ok)
		{
			window.location.pathname = `/blog-post/${postID}`;
		}
		else //otherwise, log the error to the console
		{
			const error = await response.json();
			console.log(error.name);
		}
  }
  catch (err) //if an error occured, log it to the console
  {
    console.log(err);
  }
}
//==============================================================

//adding event listeners
//=========================================================
addCommentButton.on("click", addComment);
//=========================================================