//importing packages & other files
const {Post, Comment} = require('../../models');
const loggedInAuth = require('../../utils/loggedInAuth.js');
const router = require('express').Router();
//==============================================================

//API POST route for creating a new blog post
//==============================================================
router.post('/', loggedInAuth, async (req, res) =>
{
	try
	{
		const newPost = await Post.create(
		{
			title: req.body.title,
			text: req.body.text,
			date: Date.now(),
			user_id: req.session.user_id,
		});

		console.log(newPost);

		res.status(200).redirect(`/blog-post/${newPost.id}`);
	}
	catch (err)
	{
		console.log(err);
		res.status(500).json(err);
	}
});
//==============================================================

//API PUT route for updating a blog post
//==============================================================
router.put('/:id', loggedInAuth, userIDAuth, async (req, res) =>
{

});
//==============================================================

//API DELETE route for deleting a blog post
//==============================================================
router.delete('/:id', loggedInAuth, userIDAuth, async (req, res) =>
{

});
//==============================================================

//API POST route for creating a new comment
//==============================================================
router.post('/comment/:id', loggedInAuth, async (req, res) =>
{
	try
	{
		const newComment = await Comment.create(
		{
			text: req.body.text,
			date: Date.now(),
			user_id: req.session.user_id,
			post_id: req.params.id,
		});

		console.log(newComment);

		res.status(200).redirect(`/blog-post/${newComment.post_id}`);
	}
	catch (err)
	{
		console.log(err);
		res.status(500).json(err);
	}
});
//==============================================================

module.exports = router;