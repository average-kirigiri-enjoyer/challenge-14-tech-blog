//getting references to elements necessary for script functionality
//==============================================================
const postTitleInput = $('.post-title-input');
const postContentInput = $('.post-content-input');
const uploadPostButton = $('.upload-post-button');
//==============================================================

//function to upload new post
//==============================================================
const uploadPost = async () =>
{
  //retrieves post title & text from the appropriate inputs
  const title = postTitleInput.val();
  const text = postContentInput.val();

  //if the post is missing a title or content, eject from the function
  if (!title || !text)
  {
    return;
  }

  try
	{
    //sends the post title & text data to the server to create a new blog post
    const response = await fetch("/api/blog-post/",
    {
      method: "POST",
      body: JSON.stringify({title, text}),
      headers: {"Content-Type": "application/json"},
    });

    //if the post was successfully created, return the user to the dashboard
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
uploadPostButton.on("click", uploadPost);
//=========================================================