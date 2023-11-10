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
  const title = postTitleInput.val();
  const text = postContentInput.val();

  if (!title || !text)
  {
    return;
  }

  try
	{
    const response = await fetch("/api/blog-post/",
    {
      method: "POST",
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

//adding event listeners
//=========================================================
uploadPostButton.on("click", uploadPost);
//=========================================================