//importing packages & other files
const {Post, Comment} = require('../../models');
const loggedInAuth = require('../../utils/loggedInAuth.js');
const userIDAuth = require('../../utils/userIDAuth.js')
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
			user_name: req.session.user_name,
			user_id: req.session.user_id,
		});

		console.log(newPost);

		res.status(200).json(newPost);
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
	try
	{
		const updatedPost = await Post.update(req.body, {where: {id: req.params.id}});
		console.log(updatedPost);

		res.status(200).json(updatedPost);
	}
	catch (err)
	{
		console.log(err);
		res.status(500).json(err);
	}
});
//==============================================================

//API DELETE route for deleting a blog post
//==============================================================
router.delete('/:id', loggedInAuth, userIDAuth, async (req, res) =>
{
	try
	{
		await Post.destroy({where: {id: req.params.id}});
		res.status(200).json({name: "Post Deleted"});
	}
	catch (err)
	{
		console.log(err);
		res.status(500).json(err);
	}
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
			user_name: req.session.user_name,
			user_id: req.session.user_id,
			post_id: req.params.id,
		});

		console.log(newComment);

		res.status(200).json(newComment);
	}
	catch (err)
	{
		console.log(err);
		res.status(500).json(err);
	}
});
//==============================================================

module.exports = router;