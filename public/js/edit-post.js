//getting references to elements necessary for script functionality
//==============================================================
const postTitleInput = $('.post-title-input');
const postContentInput = $('.post-content-input');
const updatePostButton = $('.update-post-button');
const deletePostButton = $('.delete-post-button');
//==============================================================

//function to update post contents
//==============================================================
const updatePost = async () =>
{
  //retrieves post title & text from the appropriate inputs
  const title = postTitleInput.val();
  const text = postContentInput.val();

  //if the post is missing a title or content, eject from the function
  if (!title || !text)
  {
    return;
  }

  //retrieves post ID from browser path
  const postID = window.location.pathname.split("/")[3];

  try
	{
    //sends post data to the server via a PUT request to update the post with the appropriate ID
    const response = await fetch(`/api/blog-post/${postID}`,
    {
      method: "PUT",
      body: JSON.stringify({title, text}),
      headers: {"Content-Type": "application/json"},
    });

    //if the post was successfully updated, return the user to the dashboard
    if (response.ok)
		{
			window.location.pathname = "/dashboard";
		}
		else //if there was an error, log it to the console
		{
			const error = await response.json();
			console.log(error.name);
		}
  }
  catch (err) //if an error occurs, log it to the console
  {
    console.log(err);
  }
}
//==============================================================

//function to delete the current post
//==============================================================
const deletePost = async () =>
{
  //retrieves post ID from browser path
  const postID = window.location.pathname.split("/")[3];

  try
	{
    //sends a request to the server to delete the blog post with the appropriate ID
    const response = await fetch(`/api/blog-post/${postID}`, {method: "DELETE"});

    //if the post was successfully deleted, return the user to the dashboard
    if (response.ok)
		{
			window.location.pathname = "/dashboard";
		}
		else //if there was an error, log it to the console
		{
			const error = await response.json();
			console.log(error.name);
		}
  }
  catch (err) //if an error occurs, log it to the console
  {
    console.log(err);
  }
}
//==============================================================

//adding event listeners
//=========================================================
updatePostButton.on("click", updatePost);
deletePostButton.on("click", deletePost);
//=========================================================