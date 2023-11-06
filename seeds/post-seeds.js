//imports post model
const {Post} = require('../models');

//defines sample post data
const postData =
[
	{
		title: 'POST TITLE!',
		text: 'POST TEXT!',
		date: '2023-08-10',
		user_id: 1,
		user_name: 'HAHAHAHA',
	},
	{
		title: 'OTHER POST TITLE!',
		text: 'OTHER POST TEXT!',
		date: '2023-08-11',
		user_id: 2,
		user_name: 'username',
	},
	{
		title: 'ANOTHER POST TITLE!',
		text: 'ANOTHER POST TEXT!',
		date: '2023-08-12',
		user_id: 3,
		user_name: 'test',
	},
];

//bulk-creates post data in database
const postSeeds = () => Post.bulkCreate(postData);

module.exports = postSeeds;