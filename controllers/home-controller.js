//importing packages, models, & utils
//==============================================================
const router = require("express").Router();
const {Post, Comment} = require("../models");
//==============================================================

//GET route to render the blog's home page
//==============================================================
router.get("/", async (req, res) =>
{
	try
	{
		//retrieves all blog posts
		const postData = await Post.findAll();

		//converts all blog posts from sequelize objects to plain javascript objects
		const posts = postData.map((post) => post.get({plain: true}));

		//renders the 'homepage' handlebars template using the above post data
		res.status(200).render("homepage",
		{
			posts,
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

//GET route to view a specific blog post
//==============================================================
router.get("/blog-post/:id", async (req, res) =>
{
	try
	{
		//attempts to find a blog post with an ID matching that of the request parameter, including any attached comments
		const blogPostData = await Post.findByPk(req.params.id, {include: [{model: Comment}]});

		//converts the above blog post & comment data from sequelize objects to plain javascript objects
		const blogPost = blogPostData.get({plain: true});

		//deconstructs the above blog post data's properties
		const {title, text, date, user_name, comments} = blogPost;

		//renders the 'post' handlebars template using the above blog post data
		res.status(200).render("post",
		{
			title,
			text,
			date,
			user_name, 
			comments,
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

//GET route to view the login / sign-up page
//==============================================================
router.get("/login", (req, res) =>
{
	try
	{
		//if the user is logged in, redirect their request straight back to the home page
		if (req.session.logged_in)
		{
			res.redirect("/");
			return;
		}

		//render the 'login' handlebars template
		res.render("login");
	}
	catch (err) //if an error occurs, respond with a status 500, return the error as JSON data, & log the error to console
	{
		console.log(err);
		res.status(500).json(err);
	}
});
//==============================================================

module.exports = router;