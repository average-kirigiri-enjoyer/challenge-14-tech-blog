//importing packages, models, & utils
const {Post} = require("../models");
const loggedInAuth = require("../utils/loggedInAuth.js"); //authentication to check if a user is logged in
const userIDAuth = require("../utils/userIDAuth.js") //authentication to check if a user is attempting to edit a blog post associated with their account
const router = require("express").Router();
//==============================================================

//GET route to view the user's dashboard page
// =============================================================
router.get("/", loggedInAuth, async (req, res) =>
{
	try
	{
		//retrieves all blog posts associated with the user ID attached to the user's session
		const postData = await Post.findAll({where: {user_id: req.session.user_id}});

		//converts all posts from sequelize objects to plain javascript objects
		const posts = postData.map((post) => post.get({plain: true}));

		//renders the 'dashboard' handlebars template using the above post data
		res.status(200).render("dashboard",
		{
			posts,
			logged_in: req.session.logged_in,
			user_id: req.session.user_id,
		});
	}
	catch (err) //if an error occurs, respond with a status 500, return the error as JSON data, & log the error to console
	{
		console.log(err);
		res.status(500).json(err);
	}
});
//==============================================================

//GET route to render the new blog post creation page
//==============================================================
router.get("/create-post", loggedInAuth, async (req, res) =>
{
	try
	{
		//renders the 'new-post' handlebars template
		res.render("new-post",
		{
			logged_in: req.session.logged_in,
		});
	}
	catch (err) //if an error occurs, respond with a status 500, return the error as JSON data, & log the error to console
	{
		console.log(err);
		res.status(500).json(err);
	}
});
//==============================================================

//GET route to render the blog post edit page
//==============================================================
router.get("/edit/:id", loggedInAuth, userIDAuth, async (req, res) =>
{
	try
	{
		//attempts to find a blog post with an ID matching that of the request parameter
		const blogPostData = await Post.findByPk(req.params.id);

		//converts the above blog post from a sequelize object to a plain javascript object
		const blogPost = blogPostData.get({plain: true});

		//deconstructs the title & text properties from the above blog post
		const {title, text} = blogPost;

		//renders the 'new-post' handlebars template using the appropriate title & text data of the post the user is trying to edit, with the 'edit' status set to true
		res.render("new-post",
		{
			title,
			text,
			logged_in: req.session.logged_in,
			edit: true,
		});
	}
	catch (err) //if an error occurs, respond with a status 500, return the error as JSON data, & log the error to console
	{
		console.log(err);
		res.status(500).json(err);
	}
});
//==============================================================

module.exports = router;