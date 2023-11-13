//importing packages, models, & utils
const {Post, Comment} = require("../../models");
const loggedInAuth = require("../../utils/loggedInAuth.js"); //authentication to check if a user is logged in
const userIDAuth = require("../../utils/userIDAuth.js") //authentication to check if a user is attempting to edit a blog post associated with their account
const router = require("express").Router();
//==============================================================

//API POST route for creating a new blog post
//==============================================================
router.post("/", loggedInAuth, async (req, res) =>
{
	try
	{
		//attempts to create a new blog post using session & body data from incoming request
		const newPost = await Post.create(
		{
			title: req.body.title,
			text: req.body.text,
			date: Date.now(),
			user_name: req.session.user_name,
			user_id: req.session.user_id,
		});

		//responds with a status of 200 alongside the new blog post as JSON data
		res.status(200).json(newPost);
	}
	catch (err) //if an error occurs, respond with a status 500, return the error as JSON data, & log the error to console
	{
		console.log(err);
		res.status(500).json(err);
	}
});
//==============================================================

//API PUT route for updating a blog post
//==============================================================
router.put("/:id", loggedInAuth, userIDAuth, async (req, res) =>
{
	try
	{
		//attempts to update the blog post with the matching ID from the request parameters using data from the request body
		const updatedPost = await Post.update(req.body, {where: {id: req.params.id}});

		//responds with a status of 200 alongside the updated blog post as JSON data
		res.status(200).json(updatedPost);
	}
	catch (err) //if an error occurs, respond with a status 500, return the error as JSON data, & log the error to console
	{
		console.log(err);
		res.status(500).json(err);
	}
});
//==============================================================

//API DELETE route for deleting a blog post
//==============================================================
router.delete("/:id", loggedInAuth, userIDAuth, async (req, res) =>
{
	try
	{
		//attempts to delete the blog post with the matching ID from the request parameters using data from the request body
		await Post.destroy({where: {id: req.params.id}});

		//responds with a status of 200 alongside the JSON message "Post Deleted"
		res.status(200).json({name: "Post Deleted"});
	}
	catch (err) //if an error occurs, respond with a status 500, return the error as JSON data, & log the error to console
	{
		console.log(err);
		res.status(500).json(err);
	}
});
//==============================================================

//API POST route for creating a new comment
//==============================================================
router.post("/comment/:id", loggedInAuth, async (req, res) =>
{
	try
	{
		//attempts to create a new comment using session, body, & parameter data from incoming request
		const newComment = await Comment.create(
		{
			text: req.body.text,
			date: Date.now(),
			user_name: req.session.user_name,
			user_id: req.session.user_id,
			post_id: req.params.id,
		});

		//responds with a status of 200 alongside the new comment as JSON data
		res.status(200).json(newComment);
	}
	catch (err) //if an error occurs, respond with a status 500, return the error as JSON data, & log the error to console
	{
		console.log(err);
		res.status(500).json(err);
	}
});
//==============================================================

module.exports = router;