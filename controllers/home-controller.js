//importing packages, models, & utils
//==============================================================
const router = require('express').Router();
const {Post, Comment} = require('../models');
const loggedInAuth = require('../utils/loggedInAuth');
//==============================================================

//GET route to render the blog's home page
//==============================================================
router.get('/', async (req, res) =>
{
	try
	{
		const postData = await Post.findAll();

		const posts = postData.map((post) => post.get({plain: true}));

		console.log(req.session.logged_in);

		res.status(200).render('homepage',
		{
			posts,
			logged_in: req.session.logged_in,
		});
	}
	catch (err)
	{
		res.status(500).json(err);
	}
});
//==============================================================

//GET route to view a specific blog post
//==============================================================
router.get('/blog-post/:id', async (req, res) =>
{
	try
	{
		const blogPostData = await Post.findByPk(req.params.id, {include: [{model: Comment}]});
		const blogPost = blogPostData.get({plain: true});

		console.log(blogPost);

		const {title, text, date, user_name, comments} = blogPost;

		res.status(200).render('post',
		{
			title, text, date, user_name, comments, logged_in: req.session.logged_in,
		});
	}
	catch (err)
	{
		res.status(500).json(err);
	}
});
//==============================================================

//GET route to view the login / sign-up page
//==============================================================
router.get('/login', (req, res) =>
{
	if (req.session.logged_in)
	{
		res.redirect('/');
		return;
	}
	res.render('login');
});
//==============================================================

module.exports = router;