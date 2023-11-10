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
  const title = postTitleInput.val();
  const text = postContentInput.val();

  if (!title || !text)
  {
    return;
  }

  const postID = window.location.pathname.split("/")[3];
  console.log(postID);

  try
	{
    const response = await fetch(`/api/blog-post/${postID}`,
    {
      method: "PUT",
      body: JSON.stringify({title, text}),
      headers: {"Content-Type": "application/json"},
    });

    if (response.ok)
		{
			window.location.pathname = "/dashboard";
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

//function to delete the current post
//==============================================================
const deletePost = async () =>
{
  const postID = window.location.pathname.split("/")[3];
  console.log(postID);

  try
	{
    const response = await fetch(`/api/blog-post/${postID}`, {method: "DELETE"});

    if (response.ok)
		{
			window.location.pathname = "/dashboard";
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
updatePostButton.on("click", updatePost);
deletePostButton.on("click", deletePost);
//=========================================================